package notificator.web.api.model;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.json.JSONException;
import org.json.JSONObject;

public class FlightImpl implements Flight, Serializable {

	// info del vuelo
	private Integer flightNum;
	private String airlineId;
	private String airlineName;
	private String airlineLogo;
	private String status;
	
	// info de la salida
	private String departureCountry;	
	private String departureTimeZone;	
	private String departureCity;	
	private String departureAirport;
	private String departureGate;	
	private String departureTerminal;	
	private String departureScheduledTime;
	private String departureScheduledDay;	
	private String departureScheduledGateTime;	
	private String departureActualGateTime;
	private String departureEstimatedRunwayTime;	
	private String departureActualRunwayTime;	
	private Integer departureGateDelay;	
	private Integer departureRunwayDelay;	
	
	// info de la llegada
	private String arrivalCountry;	
	private String arrivalTimeZone;	
	private String arrivalCity;	
	private String arrivalAirport;	
	private String arrivalGate;	
	private String arrivalBaggageGate;	
	private String arrivalTerminal;	
	private String arrivalScheduledTime;
	private String arrivalScheduledDay;
	private String arrivalScheduledGateTime;	
	private String arrivalActualGateTime;
	private String arrivalEstimatedRunwayTime;	
	private String arrivalActualRunwayTime;	
	private Integer arrivalGateDelay;	
	private Integer arrivalRunwayDelay;
	
	public FlightImpl( int flightNum, String airlineId, String airlineName, String status, String departureCountry, String departureTimeZone, String departureCity, 
			String departureAirport, String departureGate, String departureTerminal, String departureScheduledTime, String departureScheduledGateTime, String departureActualGateTime, 
			String departureEstimatedRunwayTime, String departureActualRunwayTime, int departureGateDelay, int departureRunwayDelay, String arrivalCountry, String arrivalTimeZone, 
			String arrivalCity, String arrivalAirport, String arrivalGate, String arrivalBaggageGate, String arrivalTerminal, String arrivalScheduledTime, String arrivalScheduledGateTime, 
			String arrivalActualGateTime, String arrivalEstimatedRunwayTime, String arrivalActualRunwayTime, int arrivalGateDelay, int arrivalRunwayDelay, String airlineLogo, String departureScheduledDay, String arrivalScheduledDay) {
		this.flightNum = flightNum;
		this.airlineId = airlineId;
		this.airlineName = airlineName;
		this.status = status;
		this.departureCountry = departureCountry;
		this.departureTimeZone = departureTimeZone;
		this.departureCity = departureCity;
		this.departureAirport = departureAirport;
		this.departureGate = departureGate;
		this.departureTerminal = departureTerminal;
		this.departureScheduledTime = departureScheduledTime;
		this.departureScheduledGateTime = departureScheduledGateTime;
		this.departureActualGateTime = departureActualGateTime;
		this.departureEstimatedRunwayTime = departureEstimatedRunwayTime;
		this.departureActualRunwayTime = departureActualRunwayTime;
		this.departureGateDelay = departureGateDelay;
		this.departureRunwayDelay = departureRunwayDelay;
		this.arrivalCountry = arrivalCountry;
		this.arrivalTimeZone = arrivalTimeZone;
		this.arrivalCity = arrivalCity;
		this.arrivalAirport = arrivalAirport;
		this.arrivalGate = arrivalGate;
		this.arrivalBaggageGate = arrivalBaggageGate;
		this.arrivalTerminal = arrivalTerminal;
		this.arrivalScheduledTime = arrivalScheduledTime;
		this.arrivalScheduledGateTime = arrivalScheduledGateTime;
		this.arrivalActualGateTime = arrivalActualGateTime;
		this.arrivalEstimatedRunwayTime = arrivalEstimatedRunwayTime;
		this.arrivalActualRunwayTime = arrivalActualRunwayTime;
		this.arrivalGateDelay = arrivalGateDelay;
		this.arrivalRunwayDelay = arrivalRunwayDelay;
		this.airlineLogo = airlineLogo;
		this.departureScheduledDay = departureScheduledDay;
		this.arrivalScheduledDay = arrivalScheduledDay;
	}
	
	public static Flight fromJSON(String JSONString){
		try {
			JSONObject jsonObj = new JSONObject(JSONString);
			// info del vuelo		
			String airlineId = jsonObj.getJSONObject("status").getJSONObject("airline").getString("id");
			String airlineName = jsonObj.getJSONObject("status").getJSONObject("airline").getString("name");
			String airlineLogo = jsonObj.getJSONObject("status").getJSONObject("airline").getString("logo");
			Integer flightNum = jsonObj.getJSONObject("status").getInt("number");
			String status = jsonObj.getJSONObject("status").getString("status");
			// info de la salida
			String departureAirport = (jsonObj.getJSONObject("status").getJSONObject("departure").getJSONObject("airport").getString("description")).split(",")[0];
			String departureTimeZone = jsonObj.getJSONObject("status").getJSONObject("departure").getJSONObject("airport").getString("timezone");
			String departureTerminal = jsonObj.getJSONObject("status").getJSONObject("departure").getJSONObject("airport").getString("terminal");
			if(departureTerminal.equals("null")){
				departureTerminal = "-";
			}
			String departureGate = jsonObj.getJSONObject("status").getJSONObject("departure").getJSONObject("airport").getString("gate");
			if(departureGate.equals("null")){
				departureGate = "-";
			}
			// info de la ciudad de salida
			String departureCity = (jsonObj.getJSONObject("status").getJSONObject("departure").getJSONObject("city").getString("name")).split(",")[0];
			String departureCountry = (jsonObj.getJSONObject("status").getJSONObject("departure").getJSONObject("country").getString("name")).split(",")[0];
			// info de los horarios de salida
			String departureScheduledTime = jsonObj.getJSONObject("status").getJSONObject("departure").getString("scheduledTime").split(" ")[1];
			String departureScheduledDay = jsonObj.getJSONObject("status").getJSONObject("departure").getString("scheduledTime").split(" ")[0];
			String departureScheduledGateTime = jsonObj.getJSONObject("status").getJSONObject("departure").getString("scheduledGateTime");
			String departureActualGateTime = jsonObj.getJSONObject("status").getJSONObject("departure").getString("actualGateTime");
			String departureEstimatedRunwayTime = jsonObj.getJSONObject("status").getJSONObject("departure").getString("estimateRunwayTime");
			String departureActualRunwayTime = jsonObj.getJSONObject("status").getJSONObject("departure").getString("actualRunwayTime");
			Integer departureGateDelay = jsonObj.getJSONObject("status").getJSONObject("departure").optInt("gateDelay");
			Integer departureRunwayDelay = jsonObj.getJSONObject("status").getJSONObject("departure").optInt("runwayDelay");
			// info de la llegada
			String arrivalAirport = (jsonObj.getJSONObject("status").getJSONObject("arrival").getJSONObject("airport").getString("description")).split(",")[0];
			String arrivalTimeZone = jsonObj.getJSONObject("status").getJSONObject("arrival").getJSONObject("airport").getString("timezone");
			String arrivalTerminal = jsonObj.getJSONObject("status").getJSONObject("arrival").getJSONObject("airport").getString("terminal");
			if(arrivalTerminal.equals("null")){
				arrivalTerminal = "-";
			}
			String arrivalGate = jsonObj.getJSONObject("status").getJSONObject("arrival").getJSONObject("airport").getString("gate");
			if(arrivalGate.equals("null")){
				arrivalGate = "-";
			}
			String arrivalBaggageGate = jsonObj.getJSONObject("status").getJSONObject("arrival").getJSONObject("airport").getString("baggageGate");
			if(arrivalBaggageGate.equals("null")){
				arrivalBaggageGate = "-";
			}
			// info de la ciudad de llegada
			String arrivalCity = (jsonObj.getJSONObject("status").getJSONObject("arrival").getJSONObject("city").getString("name")).split(",")[0];
			String arrivalCountry = (jsonObj.getJSONObject("status").getJSONObject("arrival").getJSONObject("country").getString("name")).split(",")[0];
			// info de los horarios de llegada
			String arrivalScheduledTime = jsonObj.getJSONObject("status").getJSONObject("arrival").getString("scheduledTime").split(" ")[1];
			String arrivalScheduledDay = jsonObj.getJSONObject("status").getJSONObject("arrival").getString("scheduledTime").split(" ")[0];
			String arrivalScheduledGateTime = jsonObj.getJSONObject("status").getJSONObject("arrival").getString("scheduledGateTime");
			String arrivalActualGateTime = jsonObj.getJSONObject("status").getJSONObject("arrival").getString("actualGateTime");
			String arrivalEstimatedRunwayTime = jsonObj.getJSONObject("status").getJSONObject("arrival").getString("estimateRunwayTime");
			String arrivalActualRunwayTime = jsonObj.getJSONObject("status").getJSONObject("arrival").getString("actualRunwayTime");
			Integer arrivalGateDelay = jsonObj.getJSONObject("status").getJSONObject("arrival").optInt("gateDelay");
			Integer arrivalRunwayDelay = jsonObj.getJSONObject("status").getJSONObject("arrival").optInt("runwayDelay");
			
		// parseo el json y hago mi objeto
		return new FlightImpl(flightNum, airlineId, airlineName, status, departureCountry, departureTimeZone, departureCity, departureAirport, departureGate, departureTerminal, departureScheduledTime,
				departureScheduledGateTime, departureActualGateTime, departureEstimatedRunwayTime, departureActualRunwayTime, departureGateDelay, departureRunwayDelay, arrivalCountry, arrivalTimeZone, 
				arrivalCity, arrivalAirport, arrivalGate, arrivalBaggageGate, arrivalTerminal, arrivalScheduledTime, arrivalScheduledGateTime, 	arrivalActualGateTime, arrivalEstimatedRunwayTime, 
				arrivalActualRunwayTime, arrivalGateDelay, arrivalRunwayDelay, airlineLogo, departureScheduledDay, arrivalScheduledDay);
		} catch (JSONException e) {
			return null;
		}
	}
	
	public Integer getFlightNum() {
		return flightNum;
	}

	public String getFlightId() {
		return airlineId+flightNum;
	}

	public String getAirlineId() {
		return airlineId;
	}

	public String getAirlineName() {
		return airlineName;
	}
	
	public String getAirlineLogo(){
		return airlineLogo;
	}
	
	public String getStatus() {
		return status;
	}

	public String getDepartureCountry() {
		return departureCountry;
	}

	public String getDepartureTimeZone() {
		return departureTimeZone;
	}

	public String getDepartureCity() {
		return departureCity;
	}

	public String getDepartureAirport() {
		return departureAirport;
	}

	public String getDepartureGate() {
		return departureGate;
	}

	public String getDepartureTerminal() {
		return departureTerminal;
	}

	public String getDepartureScheduledTime() {
		return departureScheduledTime;
	}

	public String getDepartureScheduledGateTime() {
		return departureScheduledGateTime;
	}

	public String getDepartureActualGateTime() {
		return departureActualGateTime;
	}

	public String getDepartureEstimatedRunwayTime() {
		return departureEstimatedRunwayTime;
	}

	public String getDepartureActualRunwayTime() {
		return departureActualRunwayTime;
	}

	public Integer getDepartureGateDelay() {
		return departureGateDelay;
	}

	public Integer getDepartureRunwayDelay() {
		return departureRunwayDelay;
	}

	public String getArrivalCountry() {
		return arrivalCountry;
	}
	
	public String getArrivalTimeZone() {
		return arrivalTimeZone;
	}

	public String getArrivalCity() {
		return arrivalCity;
	}

	public String getArrivalAirport() {
		return arrivalAirport;
	}

	public String getArrivalGate() {
		return arrivalGate;
	}

	public String getArrivalBaggageGate() {
		return arrivalBaggageGate;
	}

	public String getArrivalTerminal() {
		return arrivalTerminal;
	}

	public String getArrivalScheduledTime() {
		return arrivalScheduledTime;
	}

	public String getArrivalScheduledGateTime() {
		return arrivalScheduledGateTime;
	}

	public String getArrivalActualGateTime() {
		return arrivalActualGateTime;
	}

	public String getArrivalEstimatedRunwayTime() {
		return arrivalEstimatedRunwayTime;
	}

	public String getArrivalActualRunwayTime() {
		return arrivalActualRunwayTime;
	}

	public Integer getArrivalGateDelay() {
		return arrivalGateDelay;
	}

	public Integer getArrivalRunwayDelay() {
		return arrivalRunwayDelay;
	}

	public String getDepartureDay() {
		return departureScheduledDay;
	}
	
	public String getArrivalDay() {
		return arrivalScheduledDay;
	}
}
