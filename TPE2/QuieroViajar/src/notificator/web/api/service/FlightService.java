package notificator.web.api.service;

import java.io.IOException;
import java.net.SocketTimeoutException;

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

public class FlightService extends IntentService {

	private final String TAG = getClass().getSimpleName();

	public static final int STATUS_CONNECTION_ERROR = -1;
	public static final int STATUS_ERROR = -2;
	public static final int STATUS_ILLEGAL_ARGUMENT = -3;
	public static final int STATUS_OK = 0;

	public FlightService() {
		super("FlighthService");
	}

	/*
	 * Evento que se ejecuta cuando se invocó el servicio por medio de un
	 * Intent.
	 */
	@Override
	protected void onHandleIntent(final Intent intent) {
		final ResultReceiver receiver = intent.getParcelableExtra("receiver");
		final String flight = intent.getStringExtra("flight");

		final Bundle b = new Bundle();
		try {
			getFlights(receiver, flight, b);
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
	}

	private void getFlights(ResultReceiver receiver, String flight, Bundle b) throws ClientProtocolException, IOException, JSONException {
		final DefaultHttpClient client = new DefaultHttpClient();
		System.out.println("http://eiffel.itba.edu.ar/hci/service2/Status.groovy?method=GetFlightStatus&airline_id="+flight.substring(0,2)+"&flight_num="+flight.substring(2));
		final HttpResponse response = client.execute(new HttpGet("http://eiffel.itba.edu.ar/hci/service2/Status.groovy?method=GetFlightStatus&airline_id="+flight.substring(0,2)+"&flight_num="+flight.substring(2)));
		if ( response.getStatusLine().getStatusCode() != 200 ) {
			throw new IllegalArgumentException(response.getStatusLine().toString());
		}
		String flightJSON = EntityUtils.toString(response.getEntity());
		JSONObject jsonObj = new JSONObject(flightJSON);
		if(jsonObj.has("error")){
			flightJSON = null;
		}
		b.putString("return", flightJSON);
		receiver.send(STATUS_OK, b);
	}
}
