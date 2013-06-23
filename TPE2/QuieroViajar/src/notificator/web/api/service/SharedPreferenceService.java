package notificator.web.api.service;

import java.util.HashSet;
import java.util.Set;

import com.example.quieroviajar.R;

import notificator.web.api.model.FlightImpl;
import android.app.IntentService;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.ResultReceiver;
import android.widget.Toast;

public class SharedPreferenceService extends IntentService {

	public SharedPreferenceService() {
		super("SharedPreferenceService");
	}

	public void addFlight(String jsonFlight) {
		Set<String> flightsSet;
		SharedPreferences flights = getSharedPreferences("flightObjects", MODE_PRIVATE);

		SharedPreferences.Editor editor = flights.edit();
		flightsSet = flights.getStringSet("flightObjects", null);
		if (flightsSet == null) {
			flightsSet = new HashSet<String>();
		}
		flightsSet.add(jsonFlight);
		editor.remove("flightObjects");
		editor.commit();
		editor.putStringSet("flightObjects", flightsSet);
		editor.commit();
	}
	
	public void removeFlight(String flightId) {
		Set<String> flightsSet;
		String foundStr = null;
		
		SharedPreferences flights = getSharedPreferences("flightObjects", MODE_PRIVATE);

		SharedPreferences.Editor editor = flights.edit();
		flightsSet = flights.getStringSet("flightObjects", null);

		for (String str : flightsSet) {
			if (FlightImpl.fromJSON(str).getFlightId().equals(flightId)) {
				foundStr = str;
			}
		}

		flightsSet.remove(foundStr);
		editor.remove("flightObjects");
		editor.commit();
		editor.putStringSet("flightObjects", flightsSet);
		editor.commit();

	}

	public void updateFlight(final String flightId) {
		Intent intent1 = new Intent(this, FlightService.class);
		
		intent1.putExtra("flight", flightId);
		intent1.putExtra("receiver", new ResultReceiver(null) {
			protected void onReceiveResult(int resultCode, Bundle resultData) {
				super.onReceiveResult(resultCode, resultData);
				if (resultCode == FlightService.STATUS_OK) {
					Set<String> flightsSet;
					String strFound = null;
					SharedPreferences flights = getSharedPreferences("flightObjects", MODE_PRIVATE);
					SharedPreferences.Editor editor = flights.edit();
					flightsSet = flights.getStringSet("flightObjects", null);
					
					for (String str : flightsSet) {
						if (FlightImpl.fromJSON(str).getFlightId().equals(flightId)) {
							strFound = str;
						}
					}
					flightsSet.remove(strFound);
					editor.remove("flightObjects");
					editor.commit();
					String flightData = resultData.getString("return");
					flightsSet.add(flightData);
					editor.putStringSet("flightObjects", flightsSet);
					editor.commit();
				} else {
					Toast.makeText(SharedPreferenceService.this,getString(R.string.refresh_error),Toast.LENGTH_LONG).show();
				}
			}
		});
		this.startService(intent1);
	}

	@Override
	protected void onHandleIntent(Intent intent) {
		String function = intent.getStringExtra("function");
		String flightId = intent.getStringExtra("flightId");
		
		if(function.equals("add")) {
			addFlight(flightId);
		} else if(function.equals("remove")) {
			removeFlight(flightId);
		} else {
			updateFlight(flightId);
		}
	}
}
