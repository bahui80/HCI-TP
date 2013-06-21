package notificator.alarm;

import android.app.AlarmManager;
import android.app.IntentService;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

public class AlarmService extends IntentService {

	public AlarmService() {
		super("AlarmService");
	}

	@Override
	protected void onHandleIntent(Intent intent) {
		// lee el intent
		String alarm_action = intent.getStringExtra("action");
		if(alarm_action.equals("change")){
			// Cambio de frecuencia
			int frequency = intent.getIntExtra("frequency", 15);
			cancelAlarm();
			setAlarm(frequency);
			return;
		}else if(alarm_action.equals("delete")){
			// Borrado de alarma
			cancelAlarm();
			return;
		}else if(alarm_action.equals("start")){
			//Inicio de alarma con intervalo cargado de las preferencias
			Context ctx = getApplicationContext();
			SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(ctx);
			setAlarm(Integer.parseInt(prefs.getString("updates_interval", "15")));
			return;
		}
	}
	
	public void setAlarm(int frequency)
	{
		AlarmManager manager= (AlarmManager) this.getSystemService(Context.ALARM_SERVICE);
		Intent intent = new Intent(this, AlarmReceiver.class);
		PendingIntent pIntent = PendingIntent.getBroadcast(this, 0, intent, 0);
		manager.setRepeating(AlarmManager.RTC, System.currentTimeMillis(), 60000*frequency , pIntent);
	}
 
 	public void cancelAlarm()
 	{
 		AlarmManager manager = (AlarmManager) this.getSystemService(Context.ALARM_SERVICE);
 		Intent intent = new Intent(this, AlarmReceiver.class);
    	PendingIntent sender = PendingIntent.getBroadcast(this, 0, intent, 0);    	
    	manager.cancel(sender);
    }
}