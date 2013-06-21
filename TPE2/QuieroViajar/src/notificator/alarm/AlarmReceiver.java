package notificator.alarm;

import notificator.notification.CheckNotificationsService;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class AlarmReceiver extends BroadcastReceiver{

	@Override
	public void onReceive(final Context context, Intent intent) {
		Intent serviceIntent = new Intent(context, CheckNotificationsService.class);
		context.startService(serviceIntent);
	}
}
