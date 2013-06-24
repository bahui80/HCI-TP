package notificator.activities;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;
import java.util.Set;
import java.util.TreeSet;

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
import android.support.v4.app.NavUtils;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageView;
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
		getActionBar().setDisplayHomeAsUpEnabled(true);
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
	
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
			case android.R.id.home: {
				NavUtils.navigateUpTo(this, new Intent(this,MyFlightsListActivity.class));
				return true;
			}
			case R.id.settings: {
				Intent activityIntent = new Intent(this, SettingActivity.class);
				startActivity(activityIntent);
				return true;
			}
		}
		return super.onOptionsItemSelected(item);
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
				@SuppressWarnings("deprecation")
				protected void onReceiveResult(int resultCode, Bundle resultData) {
					super.onReceiveResult(resultCode, resultData);
					if (resultCode == FlightService.STATUS_OK) {
						final String flightData = resultData.getString("return");
						if (flightData != null) {
							final Flight resultFlight = FlightImpl.fromJSON(flightData);

							SearchActivity.this.setContentView(R.layout.activity_search);
							if(resultFlight.getAirlineId().equals("AA")) {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.aa);
							} else if(resultFlight.getAirlineId().equals("AF")) {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.af);
							} else if(resultFlight.getAirlineId().equals("AM")) {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.am);
							} else if(resultFlight.getAirlineId().equals("AR")) {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.ar);
							} else if(resultFlight.getAirlineId().equals("AV")) {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.av);
							} else if(resultFlight.getAirlineId().equals("AZ")) {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.az);
							} else if(resultFlight.getAirlineId().equals("BA")) {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.ba);
							} else if(resultFlight.getAirlineId().equals("CM")) {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.cm);
							} else if(resultFlight.getAirlineId().equals("IB")) {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.ib);
							} else if(resultFlight.getAirlineId().equals("JJ")) {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.jj);
							} else if(resultFlight.getAirlineId().equals("LA")) {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.la);
							} else if(resultFlight.getAirlineId().equals("TA")) {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.ta);
							} else {
								((ImageView)findViewById(R.id.detail_image)).setImageResource(R.drawable.rr);
							}
							((TextView) findViewById(R.id.flight_detail_number)).setText(resultFlight.getFlightId());
					((TextView) findViewById(R.id.flight_detail_airline))
							.setText(resultFlight.getAirlineName());
					((TextView) findViewById(R.id.flight_detail_origin))
							.setText(resultFlight.getDepartureCity());
					((TextView) findViewById(R.id.flight_detail_destiny))
							.setText(resultFlight.getArrivalCity());
					((TextView) findViewById(R.id.flight_detail_airport_origin))
							.setText(resultFlight.getDepartureAirport());
					((TextView) 
							findViewById(R.id.flight_detail_airport_destiny))
							.setText(resultFlight.getArrivalAirport());
					((TextView) 
							findViewById(R.id.flight_detail_origin_terminal))
							.setText(" " + resultFlight.getDepartureTerminal());
					((TextView) 
							findViewById(R.id.flight_detail_destiny_terminal))
							.setText(" " + resultFlight.getArrivalTerminal());
					((TextView) findViewById(R.id.flight_detail_origin_gate))
							.setText(" " + resultFlight.getDepartureGate());
					((TextView)findViewById(R.id.flight_detail_destiny_gate))
							.setText(" " + resultFlight.getArrivalGate());
					((TextView) findViewById(R.id.flight_detail_departure_day))
							.setText(resultFlight.getDepartureDay());
					((TextView) findViewById(R.id.flight_detail_baggage))
							.setText(" " + resultFlight.getArrivalBaggageGate());

					String status = resultFlight.getStatus();
					TextView view = ((TextView) findViewById(R.id.flight_detail_status));
					// ShapeDrawable background = (ShapeDrawable)
					// getResources().getDrawable((R.drawable.rectangle));
					if (status.equals("D")) {
						/*
						 * S = PLANIFICADO a=ACTIVO D=DESVIADO l=ATERRIZADO C=CANCELADO
						 * r=REDIRECCIONADO
						 */

						view.setVisibility(TextView.VISIBLE);
						// background.getPaint().setColor(
						// getResources().getColor(R.color.orange));
						// view.setBackgroundDrawable(background);
						view.setText(getString(R.string.diverted));
						view.setTextColor(getResources().getColor(R.color.orange));

					} else if (status.equals("S")) {

						view.setVisibility(TextView.VISIBLE);
						// background.getPaint().setColor(
						// getResources().getColor(R.color.green));
						// view.setBackgroundDrawable(background);
						view.setText(getString(R.string.planned));
						view.setTextColor(getResources().getColor(R.color.green));

					} else if (status.equals("A")) {
						view.setVisibility(TextView.VISIBLE);
						// background.getPaint().setColor(
						// getResources().getColor(R.color.green));
						// view.setBackgroundDrawable(background);
						view.setText(getString(R.string.active));
						view.setTextColor(getResources().getColor(R.color.green));

					} else if (status.equals("L")) {
						view.setVisibility(TextView.VISIBLE);
						// background.getPaint().setColor(
						// getResources().getColor(R.color.green));
						// view.setBackgroundDrawable(background);
						view.setText(getString(R.string.landed));
						view.setTextColor(getResources().getColor(R.color.green));

					} else if (status.equals("C")) {
						view.setVisibility(TextView.VISIBLE);
						// background.getPaint().setColor(
						// getResources().getColor(R.color.red));
						// view.setBackgroundDrawable(background);
						view.setText(getString(R.string.canceled));
						view.setTextColor(getResources().getColor(R.color.red));

					} else if (status.equals("R")) {
						view.setVisibility(TextView.VISIBLE);
						// background.getPaint().setColor(
						// getResources().getColor(R.color.red));
						// view.setBackgroundDrawable(background);
						view.setText(getString(R.string.redirected));
						view.setTextColor(getResources().getColor(R.color.red));

					}
					String departureScheduledTime = resultFlight.getDepartureScheduledTime();
					String departureActualTime;
					int departureGateDelay = resultFlight.getDepartureGateDelay();
					int departureRunwayDelay = resultFlight.getDepartureRunwayDelay();
					int totalDepartureDelay = departureGateDelay + departureRunwayDelay;

					// Seteo de la hora de despegue

					if (totalDepartureDelay == 0) {
						TextView actualTime = ((TextView) findViewById(R.id.flight_detail_origin_actual_time));
						actualTime.setText(departureScheduledTime);
					} else {
						SimpleDateFormat sdf = new SimpleDateFormat("hh:mm");
						Date date = null;
						try {
							date = sdf.parse(departureScheduledTime);
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						date.setMinutes(date.getMinutes() + totalDepartureDelay);
						TextView actualTime = ((TextView) findViewById(R.id.flight_detail_origin_actual_time));
						String aux;
						String aux2;
						if (date.getHours() < 10) {
							aux = "0" + date.getHours();
						} else {
							aux = "" + date.getHours();
						}

						if (date.getMinutes() < 10) {
							aux2 = "0" + date.getMinutes();
						} else {
							aux2 = "" + date.getMinutes();
						}
						actualTime.setText(aux + ":" + aux2);
						TextView scheduledTime = ((TextView) findViewById(R.id.flight_detail_origin_scheduled_time));
						scheduledTime.setVisibility(TextView.VISIBLE);
						scheduledTime.setText("(" + getString(R.string.scheduled) + " "
								+ departureScheduledTime + ")");

					}

					String arrivalScheduledTime = resultFlight.getArrivalScheduledTime();
					String arrivalActualTime;
					int arrivalGateDelay = resultFlight.getArrivalGateDelay();
					int arrivalRunwayDelay = resultFlight.getArrivalRunwayDelay();

					// Seteo del horario de llegada

					if (totalDepartureDelay == 0) {
						TextView actualTime = ((TextView) findViewById(R.id.flight_detail_destiny_actual_time));
						actualTime.setText(arrivalScheduledTime);

					} else {
						SimpleDateFormat sdf = new SimpleDateFormat("hh:mm");
						Date date = null;
						try {
							date = sdf.parse(arrivalScheduledTime);
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						date.setMinutes(date.getMinutes() + totalDepartureDelay);
						TextView actualTime = ((TextView) findViewById(R.id.flight_detail_destiny_actual_time));
						String aux;
						String aux2;
						if (date.getHours() < 10) {
							aux = "0" + date.getHours();
						} else {
							aux = "" + date.getHours();
						}

						if (date.getMinutes() < 10) {
							aux2 = "0" + date.getMinutes();
						} else {
							aux2 = "" + date.getMinutes();
						}
						actualTime.setText(aux + ":" + aux2);
						TextView scheduledTime = ((TextView) findViewById(R.id.flight_detail_destiny_scheduled_time));
						scheduledTime.setVisibility(TextView.VISIBLE);
						scheduledTime.setText("(" + getString(R.string.scheduled) + " "
								+ arrivalScheduledTime + ")");

					}

					// Seteo de el horario de puerta de salida
					String departureGateScheduledTime = resultFlight
							.getDepartureScheduledGateTime();
					String departureGateActualTime = resultFlight.getDepartureActualGateTime();

					if (!(departureGateScheduledTime.equals("null"))) {
						TextView actualTime = ((TextView) findViewById(R.id.flight_detail_origin_actual_gate_time));
						actualTime.setVisibility(TextView.VISIBLE);
						if (departureGateDelay == 0) {
							actualTime.setText(getString(R.string.bording) + " "
									+ departureGateScheduledTime);

						} else {
							actualTime.setText(getString(R.string.bording) + " "
									+ departureGateActualTime);

						}

					}

					String arrivalGateScheduledTime = resultFlight
							.getArrivalScheduledGateTime();
					String arrivalGateActualTime = resultFlight.getArrivalActualGateTime();

					if (!(arrivalGateScheduledTime.equals("null"))) {
						TextView actualTime = ((TextView) findViewById(R.id.flight_detail_destiny_actual_gate_time));
						actualTime.setVisibility(TextView.VISIBLE);
						if (arrivalGateDelay == 0) {
							actualTime.setText(getString(R.string.unboarding) + " "
									+ arrivalGateScheduledTime);

						} else {
							actualTime.setText(getString(R.string.unboarding) + " "
									+ arrivalGateActualTime);

						}

					}
					String departureDate = resultFlight.getDepartureDay();
					String arrivalDate = resultFlight.getArrivalDay();
					if (!(departureDate.equals(arrivalDate))) {
						((TextView) findViewById(R.id.flight_detail_destiny_day))
								.setVisibility(TextView.VISIBLE);
					}

							ToggleButton bt = (ToggleButton) findViewById(R.id.follow_button);
						//TODO por hacer lo de los botones siguiendo
							System.out.println(containsFlight(resultFlight.getFlightId()));
							if (containsFlight(resultFlight.getFlightId())) {
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
			flightsSet = new TreeSet<String>(new Comparator<String>() {
				@Override
				public int compare(String lhs, String rhs) {
					Flight f1 = FlightImpl.fromJSON(lhs);
					Flight f2 = FlightImpl.fromJSON(rhs);
					return f1.getFlightId().compareTo(f2.getFlightId());
				}
				
			});
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
