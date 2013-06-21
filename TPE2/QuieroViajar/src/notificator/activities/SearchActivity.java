package notificator.activities;

import java.util.HashSet;
import java.util.Set;

import notificator.web.api.model.Flight;
import notificator.web.api.model.FlightImpl;
import notificator.web.api.service.FlightService;
import android.annotation.SuppressLint;
import android.app.Activity;
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

import com.example.quieroviajar.R;

@SuppressLint("DefaultLocale")
public class SearchActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		Intent intent = getIntent();
		if (Intent.ACTION_SEARCH.equals(intent.getAction())) {
			String query = intent.getStringExtra(SearchManager.QUERY);
			performSearch(query);
		}

	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.search_menu, menu);

		return true;
	}

	public void performSearch(String query) {
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

							((TextView) findViewById(R.id.flight_detail_number)).setText(resultFlight.getFlightId());
							((TextView) findViewById(R.id.flight_detail_airline)).setText(resultFlight.getAirlineName());
							((TextView) findViewById(R.id.flight_detail_origin)).setText(resultFlight.getDepartureCity() + ", " + resultFlight.getDepartureCountry());
							((TextView) findViewById(R.id.flight_detail_airport_origin)).setText(resultFlight.getDepartureAirport());
							((TextView) findViewById(R.id.flight_detail_origin_date)).setText(resultFlight.getDepartureScheduledTime());
							if (resultFlight.getDepartureGate().equals("null")) { // ver si es null o "null"
								((TextView) findViewById(R.id.flight_detail_origin_gate)).setText("-");
							} else {
								((TextView) findViewById(R.id.flight_detail_origin_gate)).setText(resultFlight.getDepartureGate());
							}
							if (resultFlight.getDepartureTerminal().equals("null")) { // ver si es null o "null"
								((TextView) findViewById(R.id.flight_detail_origin_terminal)).setText("-");
							} else {
								((TextView) findViewById(R.id.flight_detail_origin_terminal)).setText(resultFlight.getDepartureTerminal());
							}

							((TextView) findViewById(R.id.flight_detail_destiny)).setText(resultFlight.getArrivalCity() + ", " + resultFlight.getArrivalCountry());
							((TextView) findViewById(R.id.flight_detail_airport_destiny)).setText(resultFlight.getArrivalAirport());
							((TextView) findViewById(R.id.flight_detail_destiny_date)).setText(resultFlight.getArrivalScheduledTime());
							if (resultFlight.getArrivalGate().equals("null")) {
								((TextView) findViewById(R.id.flight_detail_destiny_gate)).setText("no asignada");
							} else {
								((TextView) findViewById(R.id.flight_detail_destiny_gate)).setText(resultFlight.getDepartureGate());
							}
							if (resultFlight.getArrivalTerminal().equals("null")) {
								((TextView) findViewById(R.id.flight_detail_destiny_terminal)).setText("no asignada");
							} else {
								((TextView) findViewById(R.id.flight_detail_destiny_terminal)).setText(resultFlight.getDepartureTerminal());
							}
							ToggleButton bt = (ToggleButton) findViewById(R.id.follow_button);
							final Set<String> flightsSet;
							final SharedPreferences flights = getSharedPreferences("flightObjects", MODE_PRIVATE);
							flightsSet = flights.getStringSet("flightObjects", null);
							System.out.println("ANTES: " + flightsSet);
							System.out.println("IGUALES : "	+ containsFlight(flightData));
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
										removeFlight(flightData);
										((ToggleButton) arg0).setText("Seguir vuelo");
										((ToggleButton) arg0).setActivated(false);
									} else {
										addFlight(flightData);
										((ToggleButton) arg0).setText("Siguiendo");
										((ToggleButton) arg0).setActivated(true);
									}

									final Set<String> flightsSet2;
									flightsSet2 = flights.getStringSet("flightObjects", null);
									System.out.println("DESPUES: " + flightsSet2);
								}

							});
						} else {
							Toast.makeText(SearchActivity.this,"No se encontraron resultados",Toast.LENGTH_LONG).show();
						}
					} else if (resultCode == FlightService.STATUS_CONNECTION_ERROR) {
						Toast.makeText(SearchActivity.this,"Error de conexión", Toast.LENGTH_LONG).show();
					} else {
						Toast.makeText(SearchActivity.this,"No se encontraron resultados",Toast.LENGTH_LONG).show();
					}
				}
			});
			this.startService(intent1);
		} else {
			Toast.makeText(SearchActivity.this, "No se encontraron resultados",Toast.LENGTH_LONG).show();
		}
	}

	public boolean containsFlight(String flight) {
		Set<String> flightsSet;
		Flight flightObject = FlightImpl.fromJSON(flight);

		SharedPreferences flights = getSharedPreferences("flightObjects", MODE_PRIVATE);
		flightsSet = flights.getStringSet("flightObjects", null);
		if (flightsSet == null) {
			return false;
		}

		for (String str : flightsSet) {
			if (FlightImpl.fromJSON(str).getFlightId().equals(flightObject.getFlightId())) {
				return true;
			}
		}

		return false;
	}

	public void addFlight(String flight) {
		Set<String> flightsSet;
		SharedPreferences flights = getSharedPreferences("flightObjects", MODE_PRIVATE);

		SharedPreferences.Editor editor = flights.edit();
		flightsSet = flights.getStringSet("flightObjects", null);
		if (flightsSet == null) {
			flightsSet = new HashSet<String>();
		}
		flightsSet.add(flight);
		editor.putStringSet("flightObjects", flightsSet);
		editor.commit();
	}

	public void removeFlight(String flight) {
		Set<String> flightsSet;
		Flight flightObject = FlightImpl.fromJSON(flight);
		String foundStr = null;
		SharedPreferences flights = getSharedPreferences("flightObjects", MODE_PRIVATE);

		SharedPreferences.Editor editor = flights.edit();
		flightsSet = flights.getStringSet("flightObjects", null);

		for (String str : flightsSet) {
			if (FlightImpl.fromJSON(str).getFlightId().equals(flightObject.getFlightId())) {
				foundStr = str;
			}
		}

		flightsSet.remove(foundStr);
		editor.putStringSet("flightObjects", flightsSet);
		editor.commit();
	}
}
