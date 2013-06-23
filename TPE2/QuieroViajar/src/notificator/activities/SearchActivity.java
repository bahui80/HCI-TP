package notificator.activities;

import java.util.HashSet;
import java.util.Set;

import notificator.web.api.model.Flight;
import notificator.web.api.model.FlightImpl;
import notificator.web.api.service.FlightService;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.ProgressDialog;
import android.app.SearchManager;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ToggleButton;

import com.example.quieroviajar.MyFlightsListActivity;
import com.example.quieroviajar.R;

@SuppressLint("DefaultLocale")
public class SearchActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Intent intent = getIntent();
		String query = intent.getStringExtra(SearchManager.QUERY);
		performSearch(query);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.search_menu, menu);

		return true;
	}

	public void performSearch(String query) {
		final ProgressDialog mDialog = new ProgressDialog(this);
        mDialog.setMessage(getString(R.string.loading));
        mDialog.setCancelable(false);
        
		String airlineId;
		String flightNumber;
		if (query.length() >= 3) {
			airlineId = query.substring(0, 2).toUpperCase();
			flightNumber = query.substring(2);
			Intent intent1 = new Intent(this, FlightService.class);
			
			intent1.putExtra("flight", airlineId + flightNumber);
			intent1.putExtra("receiver", new ResultReceiver(new Handler()) {
				protected void onReceiveResult(int resultCode, Bundle resultData) {
					super.onReceiveResult(resultCode, resultData);
					if (resultCode == FlightService.STATUS_OK) {
						final String flightData = resultData.getString("return");
						if (flightData != null) {
							final Flight resultFlight = FlightImpl.fromJSON(flightData);

							SearchActivity.this.setContentView(R.layout.activity_search);
//TODO asgasgdasgdgasgdagdgasdgasgdgasdgasdga hacer
							((TextView) findViewById(R.id.flight_detail_number)).setText(resultFlight.getFlightId());
							((TextView) findViewById(R.id.flight_detail_airline)).setText(resultFlight.getAirlineName());
							((TextView) findViewById(R.id.flight_detail_origin)).setText(resultFlight.getDepartureCity() + ", " + resultFlight.getDepartureCountry());
							((TextView) findViewById(R.id.flight_detail_airport_origin)).setText(resultFlight.getDepartureAirport());
							((TextView) findViewById(R.id.flight_detail_origin_date)).setText(resultFlight.getDepartureScheduledTime());
							((TextView) findViewById(R.id.flight_detail_origin_gate)).setText(resultFlight.getDepartureGate());
							((TextView) findViewById(R.id.flight_detail_origin_terminal)).setText(resultFlight.getDepartureTerminal());
							((TextView) findViewById(R.id.flight_detail_destiny)).setText(resultFlight.getArrivalCity() + ", " + resultFlight.getArrivalCountry());
							((TextView) findViewById(R.id.flight_detail_airport_destiny)).setText(resultFlight.getArrivalAirport());
							((TextView) findViewById(R.id.flight_detail_destiny_date)).setText(resultFlight.getArrivalScheduledTime());
							((TextView) findViewById(R.id.flight_detail_destiny_gate)).setText(resultFlight.getDepartureGate());
							((TextView) findViewById(R.id.flight_detail_destiny_terminal)).setText(resultFlight.getDepartureTerminal());

							ToggleButton bt = (ToggleButton) findViewById(R.id.follow_button);
							final Set<String> flightsSet;
							final SharedPreferences flights = getSharedPreferences("flightObjects", MODE_PRIVATE);
							flightsSet = flights.getStringSet("flightObjects", null);
						//TODO por hacer lo de los botones siguiendo
							if (containsFlight(flightData)) {
								bt.setChecked(true);
								bt.setActivated(true);
								bt.setText("Siguiendo");
							} else {
								bt.setChecked(false);
								bt.setActivated(false);
								bt.setText("Seguir vuelo");
							}
							bt.setOnClickListener(new OnClickListener() {
								@Override
								public void onClick(View arg0) {
									if (((ToggleButton) arg0).isActivated()) {
										removeFlight(resultFlight.getFlightId());
										((ToggleButton) arg0).setText("Seguir vuelo");
										((ToggleButton) arg0).setActivated(false);
									} else {
										addFlight(flightData);
										((ToggleButton) arg0).setText("Siguiendo");
										((ToggleButton) arg0).setActivated(true);
									}

									final Set<String> flightsSet2;
									flightsSet2 = flights.getStringSet("flightObjects", null);
								
								}

							});
							mDialog.dismiss();
						} else {
							Toast.makeText(SearchActivity.this,getString(R.string.search_fail),Toast.LENGTH_LONG).show();
							Intent intent = new Intent(SearchActivity.this, MyFlightsListActivity.class);
							startActivity(intent);
							mDialog.dismiss();
						}
					} else if (resultCode == FlightService.STATUS_CONNECTION_ERROR) {
						mDialog.dismiss();
						Toast.makeText(SearchActivity.this,getString(R.string.connection_error), Toast.LENGTH_LONG).show();
						Intent intent = new Intent(SearchActivity.this, MyFlightsListActivity.class);
						startActivity(intent);
					} else {
						mDialog.dismiss();
						Toast.makeText(SearchActivity.this,getString(R.string.unknown_error),Toast.LENGTH_LONG).show();
						Intent intent = new Intent(SearchActivity.this, MyFlightsListActivity.class);
						startActivity(intent);
					}
			}
			});
			mDialog.show();
			this.startService(intent1);
		} else {
			Toast.makeText(SearchActivity.this, getString(R.string.search_fail),Toast.LENGTH_LONG).show();
			Intent intent = new Intent(SearchActivity.this, MyFlightsListActivity.class);
			startActivity(intent);
			mDialog.dismiss();
		}
	}

	public boolean containsFlight(String flightId) {
		Set<String> flightsSet;
		
		SharedPreferences flights = getSharedPreferences("flightObjects", MODE_PRIVATE );
		flightsSet = flights.getStringSet("flightObjects", null);
		if (flightsSet == null) {
			return false;
		}

		for (String str : flightsSet) {
			if (FlightImpl.fromJSON(str).getFlightId().equals(flightId)) {
				return true;
			}
		}
		return false;
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
}
