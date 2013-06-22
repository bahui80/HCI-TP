package com.example.quieroviajar;

import java.util.Set;

import notificator.web.api.model.Flight;
import notificator.web.api.model.FlightImpl;
import notificator.web.api.service.FlightService;
import android.app.IntentService;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.ResultReceiver;

public class UpdateService extends IntentService {

	public UpdateService() {
		super("UpdateService");
	}

	@Override
	protected void onHandleIntent(Intent intent) {
		String flight = intent.getStringExtra("flight");
		final Set<String> flightsSet;
		String strFound = null;
		Intent intent1 = new Intent(this, FlightService.class);
		
		Flight flightObject = FlightImpl.fromJSON(flight);
		
		SharedPreferences flights = getSharedPreferences("flightObjects", MODE_PRIVATE);
		final SharedPreferences.Editor editor = flights.edit();
		flightsSet = flights.getStringSet("flightObjects", null);
		
		for (String str : flightsSet) {
			if (FlightImpl.fromJSON(str).getFlightId().equals(flightObject.getFlightId())) {
				strFound = str;
			}
		}

		flightsSet.remove(strFound);
		
		//agrego el vuelo nuevo actualizado

		intent1.putExtra("flight", flightObject.getFlightId());
		intent1.putExtra("receiver", new ResultReceiver(null) {
			protected void onReceiveResult(int resultCode, Bundle resultData) {
				super.onReceiveResult(resultCode, resultData);
				if (resultCode == FlightService.STATUS_OK) {
					String flightData = resultData.getString("return");
					flightsSet.add(flightData);
					editor.putStringSet("flightObjects", flightsSet);
					editor.commit();
				} else {
					
				}
			}
		});
		this.startService(intent1);
	}
}
