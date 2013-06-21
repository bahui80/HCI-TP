package notificator.notification;

import java.util.Set;
import notificator.web.api.model.Flight;
import notificator.web.api.model.FlightImpl;
import notificator.web.api.service.FlightService;
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

								// Chequeo cambios y disparo nortificaciones
								if(sharedPref.getBoolean("state_change", true) && !curFlight.getStatus().equals(resultFlight.getStatus())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getStatus()+" -> "+resultFlight.getStatus());
									notifyFlight(resultFlight, statusConvert(resultFlight.getStatus()));
								} else if (sharedPref.getBoolean("terminal_change", true) && !curFlight.getDepartureTerminal().equals(resultFlight.getDepartureTerminal())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getDepartureTerminal()+" -> "+resultFlight.getDepartureTerminal());
									notifyFlight(resultFlight, "Nueva terminal de partida: "+resultFlight.getDepartureTerminal());
								} else if (sharedPref.getBoolean("terminal_change", true) && !curFlight.getArrivalTerminal().equals(resultFlight.getArrivalTerminal())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getArrivalTerminal()+" -> "+resultFlight.getArrivalTerminal());
									notifyFlight(resultFlight, "Nueva terminal de arribo: "+resultFlight.getArrivalTerminal());
								} else if (sharedPref.getBoolean("gate_change", true) && !curFlight.getDepartureGate().equals(resultFlight.getDepartureGate())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getDepartureGate()+" -> "+resultFlight.getDepartureGate());
									notifyFlight(resultFlight, "Nueva puerta de partida: "+resultFlight.getDepartureGate());
								} else if (sharedPref.getBoolean("gate_change", true) && !curFlight.getArrivalGate().equals(resultFlight.getArrivalGate())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getArrivalGate()+" -> "+resultFlight.getArrivalGate());
									notifyFlight(resultFlight, "Nueva puerta de arribo: "+resultFlight.getArrivalGate());
								} else if (sharedPref.getBoolean("time_change", true) && !curFlight.getDepartureScheduledTime().equals(resultFlight.getDepartureScheduledTime())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getDepartureScheduledTime()+" -> "+resultFlight.getDepartureScheduledTime());
									notifyFlight(resultFlight, "Cambio en el horario de partida: "+resultFlight.getDepartureScheduledTime());
								} else if (sharedPref.getBoolean("time_change", true) && !curFlight.getArrivalScheduledTime().equals(resultFlight.getArrivalScheduledTime())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getArrivalScheduledTime()+" -> "+resultFlight.getArrivalScheduledTime());
									notifyFlight(resultFlight, "Cambio en el horario de llegada: "+resultFlight.getArrivalScheduledTime());
								} else if (sharedPref.getBoolean("baggage_changee", true) && !curFlight.getArrivalBaggageGate().equals(resultFlight.getArrivalBaggageGate())){
									System.out.println("VUELO "+curFlight.getFlightId()+": "+curFlight.getArrivalBaggageGate()+" -> "+resultFlight.getArrivalBaggageGate());
									notifyFlight(resultFlight, "Cambio en la puerta de equipaje: "+resultFlight.getArrivalBaggageGate());
								}
								
							} else if (resultCode == FlightService.STATUS_CONNECTION_ERROR) {
								Toast.makeText(CheckNotificationsService.this,"Connection error",Toast.LENGTH_LONG).show();
							} else {
								Toast.makeText(CheckNotificationsService.this,"Unkown error",Toast.LENGTH_LONG).show();
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
		CheckNotificationsService.this.startService(serviceIntent);
	}
	
	private String statusConvert(String status){
		if(status.equals("S"))
			return "Vuelo planificado";
		else if(status.equals("A"))
			return "Vuelo activo";
		else if(status.equals("D"))
			return "Vuelo desviado";	
		else if(status.equals("L"))
			return "Vuelo aterrizado";
		else
			return "Vuelo cancelado";
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
