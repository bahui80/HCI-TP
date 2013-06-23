package notificator.web.api.service;

import java.io.IOException;
import java.net.SocketTimeoutException;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.IntentService;
import android.content.Intent;
import android.os.Bundle;
import android.os.ResultReceiver;
import android.util.Log;

public class CommentService extends IntentService {

	private final String TAG = getClass().getSimpleName();

	public static final int STATUS_CONNECTION_ERROR = -1;
	public static final int STATUS_ERROR = -2;
	public static final int STATUS_ILLEGAL_ARGUMENT = -3;
	public static final int STATUS_OK = 0;

	public CommentService() {
		super("CommentService");
	}

	/*
	 * Evento que se ejecuta cuando se invocó el servicio por medio de un
	 * Intent.
	 */
	@Override
	protected void onHandleIntent(final Intent intent) {

		final ResultReceiver receiver = intent.getParcelableExtra("receiver");
		final int rating = intent.getIntExtra("rating",-1);
		final String comment = intent.getStringExtra("comment");
		final int flight = intent.getIntExtra("flight",0);
		final String airline = intent.getStringExtra("airline");

		final Bundle b = new Bundle();
		try {
			sendComment(receiver, flight, airline, rating, comment, b);
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

	private void sendComment(ResultReceiver receiver, int flight, String airline, int rating, String comment, Bundle b) throws ClientProtocolException, IOException, JSONException {
		final DefaultHttpClient client = new DefaultHttpClient();
		final HttpPost httpost = new HttpPost("http://eiffel.itba.edu.ar/hci/service2/Review.groovy?method=ReviewAirline");
		JSONObject myJson = createJson(flight, airline, rating, comment);
		StringEntity se = new StringEntity(myJson.toString());
        se.setContentType(new BasicHeader(HTTP.CONTENT_TYPE, "application/json"));
        httpost.setEntity(se);		
        HttpResponse response = client.execute(httpost);
		
		if ( response.getStatusLine().getStatusCode() != 200 ) {
			throw new IllegalArgumentException(response.getStatusLine().toString());
		}
		final String jsonToParse = EntityUtils.toString(response.getEntity());
		JSONObject responseJson = new JSONObject(jsonToParse);

		boolean gotSent = false;
		if(responseJson.getBoolean("review")){
			gotSent = true;
		}
		b.putBoolean("return", gotSent);
		receiver.send(STATUS_OK, b);
	}

	private JSONObject createJson(int flight_number, String airlineId, int rating, String comments) throws JSONException{
		JSONObject json = new JSONObject();
		json.put("airlineId", airlineId);
		json.put("flightNumber", flight_number);
		json.put("friendlinessRating", rating);
		json.put("foodRating", rating);
		json.put("punctualityRating", rating);
		json.put("mileageProgramRating", rating);
		json.put("comfortRating", rating);
		json.put("qualityPriceRating", rating);
		if(rating>5){
			json.put("yesRecommend", true);
		}else{
			json.put("yesRecommend", false);
		}
		json.put("comments", comments);
		
		System.out.println(json.toString());
		return json;
	}
}
