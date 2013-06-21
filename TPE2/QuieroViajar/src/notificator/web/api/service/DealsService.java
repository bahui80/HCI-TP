package notificator.web.api.service;

import java.io.IOException;
import java.io.Serializable;
import java.net.SocketTimeoutException;
import java.util.List;

import notificator.web.api.model.Deal;
import notificator.web.api.model.DealImpl;

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

public class DealsService extends IntentService {

	private final String TAG = getClass().getSimpleName();

	public static final int STATUS_CONNECTION_ERROR = -1;
	public static final int STATUS_ERROR = -2;
	public static final int STATUS_ILLEGAL_ARGUMENT = -3;
	public static final int STATUS_OK = 0;

	public DealsService() {
		super("OffersService");
	}

	/*
	 * Evento que se ejecuta cuando se invocó el servicio por medio de un
	 * Intent.
	 */
	@Override
	protected void onHandleIntent(final Intent intent) {
		final ResultReceiver receiver = intent.getParcelableExtra("receiver");
		final String from = intent.getStringExtra("from");
		
		final Bundle b = new Bundle();
		try {
			getDeals(receiver, from, b);
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

	private void getDeals(ResultReceiver receiver, String from, Bundle b) throws ClientProtocolException, IOException, JSONException {
		final DefaultHttpClient client = new DefaultHttpClient();
		final HttpResponse response = client.execute(new HttpGet("http://eiffel.itba.edu.ar/hci/service2/Booking.groovy?method=GetFlightDeals&from="+from));
		if ( response.getStatusLine().getStatusCode() != 200 ) {
			throw new IllegalArgumentException(response.getStatusLine().toString());
		}
		final String jsonToParse = EntityUtils.toString(response.getEntity());
		
		b.putSerializable("return", (Serializable) fromJSONtoDealList(jsonToParse));
		receiver.send(STATUS_OK, b);
	}
	
	private List<Deal> fromJSONtoDealList(final String jsonToParse) throws JSONException {
		
		JSONObject parsedJson = new JSONObject(jsonToParse);
		if (parsedJson == null || parsedJson.has("error")) {
			throw new JSONException("Hubo un error en el jsonObj");
		}
		return DealImpl.fromJSON(parsedJson);
	}
}
