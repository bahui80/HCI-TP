package notificator.notification;

import java.util.Set;

import com.example.quieroviajar.R;

import notificator.web.api.model.Flight;
import notificator.web.api.model.FlightImpl;
import notificator.web.api.service.FlightService;
import notificator.web.api.service.SharedPreferenceService;
import android.app.IntentService;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.ResultReceiver;
import android.preference.PreferenceManager;
import android.widget.Toast;

public class CheckNotificationsService extends IntentService{

	public CheckNotificationsService() {
		super("CheckNotificationsService");
	}

	protected void onHandleIntent(Intent intent) {
		//Recorro los vuelos q sigo
		Set<String> flightsSet;
		SharedPreferences flights = getSharedPreferences("flightObjects",android.content.Context.MODE_PRIVATE);
		flightsSet = flights.getStringSet("flightObjects", null);
		if(flightsSet != null){			
			for(String flightJSON: flightsSet ){
				//El vuelo que estoy siguiendo				
				final Flight curFlight = FlightImpl.fromJSON(flightJSON);

					// Mando un request al api de mis vuelos
					Intent apiIntent = new Intent(this, FlightService.class);
					String flight = curFlight.getFlightId();

					apiIntent.putExtra("flight", flight);
					apiIntent.putExtra("receiver", new ResultReceiver(null) {
						@Override
						protected void onReceiveResult(int resultCode, Bundle resultData) {
							super.onReceiveResult(resultCode, resultData);
							if (resultCode == FlightService.STATUS_OK) {
			
								// Información actualizada del vuelo
								Flight resultFlight = FlightImpl.fromJSON(resultData.getString("return"));	
								SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(CheckNotificationsService.this);
								notifyFlight(resultFlight, statusConvert(resultFlight.getStatus()));
								// Chequeo cambios y disparo nortificaciones
								if(sharedPref.getBoolean("state_change", true) && !curFlight.getStatus().equals(resultFlight.getStatus())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getStatus()+" -> "+resultFlight.getStatus());
									notifyFlight(resultFlight, statusConvert(resultFlight.getStatus()));
								} else if (sharedPref.getBoolean("terminal_change", true) && !curFlight.getDepartureTerminal().equals(resultFlight.getDepartureTerminal())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getDepartureTerminal()+" -> "+resultFlight.getDepartureTerminal());
									notifyFlight(resultFlight, getString(R.string.new_departure_terminal));
								} else if (sharedPref.getBoolean("terminal_change", true) && !curFlight.getArrivalTerminal().equals(resultFlight.getArrivalTerminal())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getArrivalTerminal()+" -> "+resultFlight.getArrivalTerminal());
									notifyFlight(resultFlight, getString(R.string.new_arrival_terminal));
								} else if (sharedPref.getBoolean("gate_change", true) && !curFlight.getDepartureGate().equals(resultFlight.getDepartureGate())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getDepartureGate()+" -> "+resultFlight.getDepartureGate());
									notifyFlight(resultFlight, getString(R.string.new_departure_gate));
								} else if (sharedPref.getBoolean("gate_change", true) && !curFlight.getArrivalGate().equals(resultFlight.getArrivalGate())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getArrivalGate()+" -> "+resultFlight.getArrivalGate());
									notifyFlight(resultFlight, getString(R.string.new_arrival_gate));
								} else if (sharedPref.getBoolean("baggage_changee", true) && !curFlight.getArrivalBaggageGate().equals(resultFlight.getArrivalBaggageGate())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getArrivalBaggageGate()+" -> "+resultFlight.getArrivalBaggageGate());
									notifyFlight(resultFlight, getString(R.string.change_lugagge));
								} else if (sharedPref.getBoolean("time_change", true) && (curFlight.getDepartureScheduledGateTime().equals("null") && !resultFlight.getDepartureScheduledGateTime().equals("null"))){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getDepartureScheduledGateTime()+" -> "+resultFlight.getDepartureScheduledGateTime());
									notifyFlight(resultFlight, getString(R.string.boarding_time_scheduled));
								} else if (sharedPref.getBoolean("time_change", true) && (curFlight.getArrivalScheduledGateTime().equals("null") && !resultFlight.getArrivalScheduledGateTime().equals("null"))){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getArrivalScheduledGateTime()+" -> "+resultFlight.getArrivalScheduledGateTime());
									notifyFlight(resultFlight, getString(R.string.unboarding_time_scheduled));	
								} else if (sharedPref.getBoolean("time_change", true) && (curFlight.getDepartureGateDelay().equals("null") && !resultFlight.getDepartureGateDelay().equals("null"))){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getDepartureGateDelay()+" -> "+resultFlight.getDepartureGateDelay());
									notifyFlight(resultFlight,getString(R.string.boarding_time_changed));
								} else if (sharedPref.getBoolean("time_change", true) && (curFlight.getArrivalGateDelay().equals("null") && !resultFlight.getArrivalGateDelay().equals("null"))){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getArrivalGateDelay()+" -> "+resultFlight.getArrivalGateDelay());
									notifyFlight(resultFlight, getString(R.string.unboarding_time_changed));
								} else if (sharedPref.getBoolean("time_change", true) && (curFlight.getDepartureRunwayDelay().equals("null") && !resultFlight.getDepartureRunwayDelay().equals("null"))){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getDepartureRunwayDelay()+" -> "+resultFlight.getDepartureRunwayDelay());
									notifyFlight(resultFlight, getString(R.string.takeoff_time_changed));
								} else if (sharedPref.getBoolean("time_change", true) && (curFlight.getArrivalRunwayDelay().equals("null") && !resultFlight.getArrivalRunwayDelay().equals("null"))){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getArrivalRunwayDelay()+" -> "+resultFlight.getArrivalRunwayDelay());
									notifyFlight(resultFlight, getString(R.string.landing_time_changed));
								}
								Intent updateIntent = new Intent(CheckNotificationsService.this, SharedPreferenceService.class);
								updateIntent.putExtra("flightId", curFlight.getFlightId());
								updateIntent.putExtra("function", "update");
								startService(updateIntent);
							} else if (resultCode == FlightService.STATUS_CONNECTION_ERROR) {
								Toast.makeText(CheckNotificationsService.this,getString(R.string.connection_error),Toast.LENGTH_LONG).show();
							} else {
								Toast.makeText(CheckNotificationsService.this,getString(R.string.unknown_error),Toast.LENGTH_LONG).show();
							}
						}
					});
					// Mando el intent al flight service
					startService(apiIntent);
			}
		}
	}
	
	private void notifyFlight(Flight flight, String description){
		Intent serviceIntent = new Intent(CheckNotificationsService.this, SendNotificationService.class);
		serviceIntent.putExtra("flight", flight.getFlightNum()+airlineToInt(flight.getAirlineId()));
		serviceIntent.putExtra("status", "Vuelo "+flight.getFlightId());
		serviceIntent.putExtra("description", description);
		serviceIntent.putExtra("flightId", flight.getFlightId());
		CheckNotificationsService.this.startService(serviceIntent);
	}
	
	private String statusConvert(String status){
		if(status.equals("S"))
			return getString(R.string.scheduled_flight);
		else if(status.equals("A"))
			return getString(R.string.active_flight);
		else if(status.equals("D"))
			return getString(R.string.diverted_flight);	
		else if(status.equals("L"))
			return getString(R.string.landed_flight);
		else if(status.equals("C"))
			return getString(R.string.canceled_flight);
		else
			return getString(R.string.redirected_flight);
	}
	
	public int airlineToInt(String airlineId){
		if(airlineId.equals("AA")){
			return 10000;
		}else if(airlineId.equals("AR")){
			return 20000;
		}else if(airlineId.equals("8R")){
			return 30000;
		}else if(airlineId.equals("JJ")){
			return 40000;
		}else if(airlineId.equals("BA")){
			return 50000;
		}else if(airlineId.equals("AF")){
			return 60000;
		}else if(airlineId.equals("AZ")){
			return 70000;
		}else if(airlineId.equals("AA")){
			return 80000;
		}else if(airlineId.equals("IB")){
			return 90000;
		}else if(airlineId.equals("AM")){
			return 100000;
		}else if(airlineId.equals("TA")){
			return 110000;
		}else if(airlineId.equals("CM")){
			return 120000;
		}else if(airlineId.equals("AV")){
			return 130000;
		}else{
			return 0;
		}
	}
}