package notificator.web.api.model;

import java.io.Serializable;

import org.json.JSONObject;

public interface Flight {
	
	// Info del vuelo
	public Integer getFlightNum();
	
	public String getFlightId();

	public String getAirlineId();

	public String getAirlineName();
	
	public String getStatus();
	
	// Info de la partida
	public String getDepartureCountry();
	
	public String getDepartureTimeZone();
	
	public String getDepartureCity();
	
	public String getDepartureAirport();
	
	public String getDepartureGate();
	
	public String getDepartureTerminal();
	
	public String getDepartureScheduledTime();
	
	public String getDepartureScheduledGateTime();
	
	public String getDepartureActualGateTime();

	public String getDepartureEstimatedRunwayTime();
	
	public String getDepartureActualRunwayTime();
	
	public Integer getDepartureGateDelay();
	
	public Integer getDepartureRunwayDelay();
	
	// Info de la llegada
	public String getArrivalCountry();
	
	public String getArrivalTimeZone();
	
	public String getArrivalCity();
	
	public String getArrivalAirport();
	
	public String getArrivalGate();
	
	public String getArrivalBaggageGate();
	
	public String getArrivalTerminal();
	
	public String getArrivalScheduledTime();
	
	public String getArrivalScheduledGateTime();
	
	public String getArrivalActualGateTime();

	public String getArrivalEstimatedRunwayTime();
	
	public String getArrivalActualRunwayTime();
	
	public Integer getArrivalGateDelay();
	
	public Integer getArrivalRunwayDelay();

	public String getDepartureDay();
	
	public String getArrivalDay();
}
