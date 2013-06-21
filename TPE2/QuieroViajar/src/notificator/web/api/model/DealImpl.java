package notificator.web.api.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class DealImpl implements Deal, Serializable{

	private String city;
	private String country;
	private Double latitude;
	private Double longitude;
	private Double price;

	public DealImpl(String city, String country, Double latitude, Double longitude, Double price){
		this.city = city;
		this.country = country;
		this.latitude = latitude;
		this.longitude = longitude;
		this.price = price;
	}
	
	public String getCity() {
		return city;
	}

	public String getCountry() {
		return country;
	}

	public Double getLat() {
		return latitude;
	}

	public Double getLong() {
		return longitude;
	}

	public Double getPrice() {
		return price;
	}

	public static List<Deal> fromJSON(JSONObject jsonObj) throws JSONException{
		 List<Deal> dealsList = new ArrayList<Deal>();
		JSONArray jsonArray = jsonObj.getJSONArray("deals");
		for(int i=0; i<jsonArray.length();i++){
			JSONObject dealJson = jsonArray.getJSONObject(i);
			String city = dealJson.optString("cityName").split(",")[0];
			String country = dealJson.optString("countryName");
			Double latitude = dealJson.optDouble("cityLatitude");
			Double longitude = dealJson.optDouble("cityLongitude");
			Double price = dealJson.optDouble("price");
			Deal deal = new DealImpl(city, country, latitude, longitude, price);
			dealsList.add(deal);
		}
		return dealsList;		
	}
}
