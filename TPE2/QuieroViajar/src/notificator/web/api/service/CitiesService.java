package notificator.web.api.service;

import java.io.IOException;
import java.io.Serializable;
import java.net.SocketTimeoutException;
import java.util.List;

import notificator.web.api.model.Cities;
import notificator.web.api.model.CitiesImpl;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;


import android.app.IntentService;
import android.content.Intent;
import android.os.Bundle;
import android.os.ResultReceiver;
import android.util.Log;

public class CitiesService extends IntentService {

	private final String TAG = getClass().getSimpleName();

	public static final int STATUS_CONNECTION_ERROR = -1;
	public static final int STATUS_ERROR = -2;
	public static final int STATUS_ILLEGAL_ARGUMENT = -3;
	public static final int STATUS_OK = 0;

	public CitiesService() {
		super("FlighthService");
	}

	/*
	 * Evento que se ejecuta cuando se invocó el servicio por medio de un
	 * Intent.
	 */
	@Override
	protected void onHandleIntent(final Intent intent) {
		final ResultReceiver receiver = intent.getParcelableExtra("receiver");
		final Double latitude = intent.getDoubleExtra("latitude", 0.0);
		final Double longitude =  intent.getDoubleExtra("longitude", 0.0);

		
		final Bundle b = new Bundle();
		try {
			getCitiesByPosition(receiver, latitude, longitude, b);
		} catch (SocketTimeoutException e) {
			Log.e(TAG, e.getMessage());
			receiver.send(STATUS_CONNECTION_ERROR, b);
		} catch (JSONException e) {
			Log.e(TAG, e.getMessage());
			receiver.send(STATUS_ERROR, b);
		} catch (ClientProtocolException e) {
			Log.e(TAG, e.getMessage());
			receiver.send(STATUS_ERROR, b);
		} catch (IllegalArgumentException e) {
			Log.e(TAG, e.getMessage());
			receiver.send(STATUS_ILLEGAL_ARGUMENT, b);
		} catch (IOException e) {
			Log.e(TAG, e.getMessage());
			receiver.send(STATUS_ERROR, b);
		}

		// Es importante terminar el servicio lo antes posible.
		this.stopSelf();
	}

	private void getCitiesByPosition(ResultReceiver receiver, Double latitude, Double longitude, Bundle b) throws ClientProtocolException, IOException, JSONException {
		final DefaultHttpClient client = new DefaultHttpClient();
		System.out.println("http://eiffel.itba.edu.ar/hci/service2/Geo.groovy?method=GetCitiesByPosition&latitude="+latitude+"&longitude="+longitude+"&radius=100");
		final HttpResponse response = client.execute(new HttpGet("http://eiffel.itba.edu.ar/hci/service2/Geo.groovy?method=GetCitiesByPosition&latitude="+latitude+"&longitude="+longitude+"&radius=100"));
		if ( response.getStatusLine().getStatusCode() != 200 ) {
			throw new IllegalArgumentException(response.getStatusLine().toString());
		}
		final String jsonToParse = EntityUtils.toString(response.getEntity());
		Cities closerCity = closerCity(fromJSONtoCities(jsonToParse),latitude,longitude);

		b.putSerializable("return", (Serializable) closerCity);
		receiver.send(STATUS_OK, b);
	}
	
	private List<Cities> fromJSONtoCities(final String jsonToParse) throws JSONException {

		JSONObject parsedJson = new JSONObject(jsonToParse);
		if (parsedJson == null || parsedJson.has("error")) {
			throw new JSONException("Hubo un error en el jsonObj");
		}
		
		return CitiesImpl.fromJSON(parsedJson);
	}

	private Cities closerCity(List<Cities> citiesList, Double latitude, Double longitude) {
		if(citiesList == null || citiesList.isEmpty()){
			return null;
		}
		Cities closerCity = citiesList.get(0);
		for(int i=0; i<citiesList.size(); i++){
			if(citiesList.get(i).distanceTo(latitude,longitude)<closerCity.distanceTo(latitude, longitude)){
				closerCity = citiesList.get(i);
			}
		}
		return closerCity;
	}
}
