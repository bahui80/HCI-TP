package notificator.notification;

import notificator.activities.SearchActivity;
import android.app.IntentService;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.SearchManager;
import android.content.Context;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;
import android.support.v4.app.TaskStackBuilder;

import com.example.quieroviajar.MyFlightsListActivity;
import com.example.quieroviajar.R;

public class SendNotificationService extends IntentService {

	public SendNotificationService() {
		super("FlightService");
	}

	@Override
	protected void onHandleIntent(Intent intent) {
		// lee el intent
		int flight_num = intent.getIntExtra("flight", -1);
		String flight_status = intent.getStringExtra("status");
		String flight_description =intent.getStringExtra("description");
		
		// creo o updateo la notificacion
		NotificationCompat.Builder mBuilder =
		        new NotificationCompat.Builder(this)
		        .setSmallIcon(R.drawable.ic_launcher)
		        .setContentTitle(flight_status)
		        .setContentText(flight_description);
		
		// Creates an explicit intent for an Activity in your app		
		Intent resultIntent = new Intent(this, SearchActivity.class);
		System.out.println(intent.getStringExtra("flightId"));
		resultIntent.putExtra(SearchManager.QUERY, intent.getStringExtra("flightId"));

		
		// The stack builder object will contain an artificial back stack for the
		// started Activity.
		// This ensures that navigating backward from the Activity leads out of
		// your application to the Home screen.
		TaskStackBuilder stackBuilder = TaskStackBuilder.create(this);
		
		// Adds the back stack for the Intent (but not the Intent itself)
		stackBuilder.addParentStack(MyFlightsListActivity.class);
		
		// Adds the Intent that starts the Activity to the top of the stack
		stackBuilder.addNextIntent(resultIntent);
		PendingIntent resultPendingIntent =
		        stackBuilder.getPendingIntent(
		        		flight_num,
		            PendingIntent.FLAG_UPDATE_CURRENT
		        );
		
		mBuilder.setContentIntent(resultPendingIntent);
		NotificationManager mNotificationManager =
		    (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
		
		// mando la notificacion
		mNotificationManager.notify(flight_num, mBuilder.build());
	}
}