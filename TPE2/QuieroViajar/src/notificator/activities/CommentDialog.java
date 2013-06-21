package notificator.activities;

import notificator.web.api.service.CommentService;
import notificator.web.api.service.FlightService;
import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;
import android.widget.RatingBar;
import android.widget.Toast;

import com.example.quieroviajar.FlightManager;
import com.example.quieroviajar.R;

public class CommentDialog extends DialogFragment {

    static CommentDialog newInstance() {
    	CommentDialog p = new CommentDialog();
        return p;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        System.out.println("ENTRO ALC OMENNNNNTTT");
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        LayoutInflater inflater = LayoutInflater.from(getActivity());
        final View v = inflater.inflate(R.layout.comment_dialog, null);
        return new AlertDialog.Builder(getActivity())
                .setTitle("Calificar vuelo")
                .setView(v)
                .setCancelable(true)
                .setPositiveButton("Comentar", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                    	
                    	// Mando un request al api de mis vuelos
                		Intent intent1 = new Intent(v.getContext(), CommentService.class);
                		
                		// Agarro las cosas del dialog
                		RatingBar rb = (RatingBar) v.findViewById(R.id.ratingBar1);
                		EditText et = (EditText) v.findViewById(R.id.editText1);

                		// Este es de prueba
                		intent1.putExtra("comment", et.getText().toString());
                		intent1.putExtra("rating", (int)(rb.getRating()*2));
                		intent1.putExtra("flight", FlightManager.CUR_ITEM.getFlightNum());
                		intent1.putExtra("airline", FlightManager.CUR_ITEM.getAirlineId());
                		
                		/* Se pasa un callback (ResultReceiver), con el cual se procesará la
                		 * respuesta del servicio. Si se le pasa null como parámetro del constructor
                		 * se usa uno de los threads disponibles del proceso. Dado que en el procesamiento
                		 * del mismo se debe modificar la UI, es necesario que ejecute con el thread de UI.
                		 * Es por eso que se lo instancia con un objeto Handler (usando el el thread de UI
                		 * para ejecutarlo).
                		 */
                		intent1.putExtra("receiver", new ResultReceiver(new Handler()) {
                			@Override
                			protected void onReceiveResult(int resultCode, Bundle resultData) {
                				super.onReceiveResult(resultCode, resultData);
                				if (resultCode == FlightService.STATUS_OK) {

                					boolean gotSent = resultData.getBoolean("return");
                					// ACA HAGO LO QUE TENGA QUE HACER CON EL RESULTADO
                					if(gotSent){
                						Toast.makeText(v.getContext(),"Gracias por dejar tu opinión!",Toast.LENGTH_LONG).show();
                					}else{
                						Toast.makeText(v.getContext(),"Hubo inconvenientes, intente más tarde",Toast.LENGTH_LONG).show();
                					}
                					
                				} else if (resultCode == FlightService.STATUS_CONNECTION_ERROR) {
                					Toast.makeText(v.getContext(),"Connection error",Toast.LENGTH_LONG).show();
                				} else {
                					Toast.makeText(v.getContext(),"Unkown error",Toast.LENGTH_LONG).show();
                				}
                			}
                		});
                		
                		// Mando el intent al flight service
                		v.getContext().startService(intent1);
                    }
                })
                .setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            dialog.cancel();
                        }
                    }).create();
    }
}
