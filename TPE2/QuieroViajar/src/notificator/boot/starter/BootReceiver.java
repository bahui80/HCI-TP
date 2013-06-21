package notificator.boot.starter;

import notificator.alarm.AlarmService;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class BootReceiver extends BroadcastReceiver {

	@Override
	public void onReceive(Context context, Intent intent) {
		 Intent start_service = new Intent(context, AlarmService.class);
		 start_service.putExtra("Action", "Start");
		 context.startService(start_service);
	} 	
}