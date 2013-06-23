package notificator.web.api.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class CitiesImpl implements Cities, Serializable{

	private String name;
	private String id;
	private Double latitude;
	private Double longitude;
	
	public String getCityId() {
		return id;
	}

	public String getCityName() {
		return name;
	}

	public Double getLongitude() {
		return longitude;
	}

	public Double getLatitude() {
		return latitude;
	}
	
	public CitiesImpl(String id, String name, Double longitude, Double latitude){
		this.id = id;
		this.name = name;
		this.longitude = longitude;
		this.latitude = latitude;
	}
	
	public static List<Cities> fromJSON(JSONObject jsonObj) throws JSONException{
		List<Cities> citiesList = new ArrayList<Cities>();
		JSONArray jsonArray = jsonObj.getJSONArray("cities");
		if(jsonArray.length() != 0){
			for(int i=0; i<jsonArray.length();i++){
				JSONObject dealJson = jsonArray.getJSONObject(i);
				String id = dealJson.optString("cityId");
				String name = dealJson.optString("name").split(",")[0];
				Double latitude = dealJson.optDouble("cityLatitude");
				Double longitude = dealJson.optDouble("cityLongitude");
				Cities city = new CitiesImpl(id, name, latitude, longitude);
				citiesList.add(city);
			}
			return citiesList;
		}else{
			System.out.println("No hay ciudades");
			return null;
		}
	}

	public Double distanceTo(Double latitude, Double longitude) {
		Double aux1 = this.latitude - latitude;
		Double aux2 = this.longitude - longitude;		
		return (Double) Math.pow(aux1,2)+Math.pow(aux2,2);
	}
}
