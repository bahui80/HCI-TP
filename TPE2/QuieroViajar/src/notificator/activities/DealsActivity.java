package notificator.activities;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import notificator.web.api.model.Cities;
import notificator.web.api.model.Deal;
import notificator.web.api.service.CitiesService;
import notificator.web.api.service.DealsService;
import notificator.web.api.service.FlightService;
import notificator.web.api.service.GPSTrackerService;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.ResultReceiver;
import android.support.v4.app.NavUtils;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.widget.Toast;

import com.example.quieroviajar.MyFlightsListActivity;
import com.example.quieroviajar.R;

public class DealsActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_deals);
		getActionBar().setDisplayHomeAsUpEnabled(true);
		final ProgressDialog mDialog = new ProgressDialog(this);
		mDialog.setMessage(getString(R.string.loading));
		mDialog.setCancelable(false);
		mDialog.show();
		// Manejo del GPS
		GPSTrackerService gps = new GPSTrackerService(this);
		if (gps.canGetLocation()) {

			// Mando un request al api de mis vuelos
			Intent apiIntentCity = new Intent(this, CitiesService.class);

			// Este es de prueba
			apiIntentCity.putExtra("latitude", gps.getLatitude());
			apiIntentCity.putExtra("longitude", gps.getLongitude());
			apiIntentCity.putExtra("receiver",
					new ResultReceiver(new Handler()) {
						@Override
						protected void onReceiveResult(int resultCode,
								Bundle resultData) {
							super.onReceiveResult(resultCode, resultData);
							if (resultCode == FlightService.STATUS_OK) {

								final Cities closestCity = (Cities) resultData
										.getSerializable("return");
								// ACA TENGO LA CIUDAD QUE ENGANCHO EL GPS
								// AHORA BUSCO LASOFERTAS DE ESTA CIUDAD
								if (closestCity != null) {
									Intent apiIntentDeals = new Intent(
											DealsActivity.this,
											DealsService.class);
									apiIntentDeals.putExtra("from",
											closestCity.getCityId());
									apiIntentDeals.putExtra("receiver",
											new ResultReceiver(new Handler()) {
												@Override
												protected void onReceiveResult(
														int resultCode,
														Bundle resultData) {
													super.onReceiveResult(
															resultCode,
															resultData);
													if (resultCode == FlightService.STATUS_OK) {
														@SuppressWarnings("unchecked")
														List<Deal> dealsList = (List<Deal>) resultData
																.getSerializable("return");
														// ACA HAGO LA LISTA DE
														// OFERTAS
														mDialog.dismiss();
														Toast.makeText(
																DealsActivity.this,
																getString(R.string.deals_from)
																		+ " "
																		+ closestCity
																				.getCityName(),
																Toast.LENGTH_LONG)
																.show();
														makeList(dealsList,
																closestCity);
													} else if (resultCode == FlightService.STATUS_CONNECTION_ERROR) {
														mDialog.dismiss();
														Toast.makeText(
																DealsActivity.this,
																getString(R.string.connection_error),
																Toast.LENGTH_LONG)
																.show();
														Intent intent = new Intent(
																DealsActivity.this,
																MyFlightsListActivity.class);
														startActivity(intent);
													} else {
														mDialog.dismiss();
														Toast.makeText(
																DealsActivity.this,
																getString(R.string.unknown_error),
																Toast.LENGTH_LONG)
																.show();
														Intent intent = new Intent(
																DealsActivity.this,
																MyFlightsListActivity.class);
														startActivity(intent);
													}
												}
											});
									// Mando el intent al flight service
									DealsActivity.this
											.startService(apiIntentDeals);
								} else {
									mDialog.dismiss();
									TextView tv = new TextView(
											DealsActivity.this);
									tv.setPadding(10, 10, 10, 10);
									tv.setText(getString(R.string.city_search_fail));
									setContentView(tv);
								}
							} else if (resultCode == FlightService.STATUS_CONNECTION_ERROR) {
								mDialog.dismiss();
								Toast.makeText(DealsActivity.this,
										getString(R.string.connection_error),
										Toast.LENGTH_LONG).show();
								Intent intent = new Intent(DealsActivity.this,
										MyFlightsListActivity.class);
								startActivity(intent);
							} else {
								mDialog.dismiss();
								Toast.makeText(DealsActivity.this,
										getString(R.string.unknown_error),
										Toast.LENGTH_LONG).show();
								Intent intent = new Intent(DealsActivity.this,
										MyFlightsListActivity.class);
								startActivity(intent);
							}
						}
					});
			// Mando el intent al flight service
			startService(apiIntentCity);
		} else {
			mDialog.dismiss();
			gps.showSettingsAlert();
		}
	}

	private void makeList(List<Deal> dealsList, Cities from) {
		setContentView(R.layout.activity_deals);
		ListView activityList = (ListView) findViewById(R.id.deals_list);
		List<Map<String, String>> data = loadData(dealsList);
		SimpleAdapter adapter = new SimpleAdapter(this, data,
				R.layout.deal_row, new String[] { "city", "country", "price" },
				new int[] { R.id.city, R.id.country, R.id.price });
		activityList.setAdapter(adapter);

	}

	private List<Map<String, String>> loadData(List<Deal> dealsList) {
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		for (Deal deal : dealsList) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("city", deal.getCity());
			map.put("country", deal.getCountry());
			double price = deal.getPrice();
			int fix_price = (int) price;
			map.put("price", "U$" + fix_price);
			list.add(map);
		}
		return list;
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.deals_menu, menu);
		return true;
	}

	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case android.R.id.home: {
			NavUtils.navigateUpTo(this, new Intent(this,
					MyFlightsListActivity.class));
			return true;
		}
		case R.id.settings: {
			Intent activityIntent = new Intent(this, SettingActivity.class);
			startActivity(activityIntent);
			return true;
		}
		}

		return super.onOptionsItemSelected(item);
	}

}
