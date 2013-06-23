package notificator.activities;

import notificator.alarm.AlarmService;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.OnSharedPreferenceChangeListener;
import android.os.Bundle;
import android.preference.Preference;
import android.preference.PreferenceActivity;

import com.example.quieroviajar.R;

public class SettingActivity extends PreferenceActivity implements OnSharedPreferenceChangeListener{

	public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        addPreferencesFromResource(R.xml.preferences);
    }
	
	@Override
	protected void onResume() {
	    super.onResume();
	    // Set up a listener whenever a key changes
	    getPreferenceScreen().getSharedPreferences()
	            .registerOnSharedPreferenceChangeListener(this);
	}

	@Override
	protected void onPause() {
	    super.onPause();
	    // Unregister the listener whenever a key changes
	    getPreferenceScreen().getSharedPreferences()
	            .unregisterOnSharedPreferenceChangeListener(this);
	}
	
	@Override
	public void onSharedPreferenceChanged(SharedPreferences sharedPreferences, String key) {
		Preference pref = findPreference("updates_interval");
		if (key.equals("updates_interval")){
			// Actualizo el summary
			setListSummary(pref,sharedPreferences.getString(key, "1"));
			// Envio el intent
			Intent serviceIntent = new Intent(this, AlarmService.class);
			serviceIntent.putExtra("action", "change");
			serviceIntent.putExtra("frequency", Integer.parseInt(sharedPreferences.getString(key, "1")));
			startService(serviceIntent);
		}else if(key.equals("perform_updates")){
			if(sharedPreferences.getBoolean(key, true)){
				// Envio el intent para startear
				Intent serviceIntent = new Intent(this, AlarmService.class);
				serviceIntent.putExtra("action", "start");
				startService(serviceIntent);
			}else{
				// Envio el intent para cancelar
				Intent serviceIntent = new Intent(this, AlarmService.class);
				serviceIntent.putExtra("action", "delete");
				startService(serviceIntent);
			}				
		}
	}
	
	private void setListSummary(Preference pref, String key){
		String time = " " + getString(R.string.minutes);
		int divider = 1;
		if(Integer.parseInt(key) >= 60){
			time = " " + getString(R.string.hours);
			divider = 60;
		}
		pref.setSummary(getString(R.string.every) + " " +((Integer.parseInt(key))/divider)+time);
	}
}
