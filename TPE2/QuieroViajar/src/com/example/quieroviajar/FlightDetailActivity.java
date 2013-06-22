package com.example.quieroviajar;

import java.util.Set;

import notificator.activities.CommentDialog;
import notificator.web.api.model.Flight;
import notificator.web.api.model.FlightImpl;
import android.app.DialogFragment;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.NavUtils;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

/**
 * An activity representing a single Flight detail screen. This activity is only
 * used on handset devices. On tablet-size devices, item details are presented
 * side-by-side with a list of items in a {@link FlightListActivity}.
 * <p>
 * This activity is mostly just a 'shell' activity containing nothing more than
 * a {@link FlightDetailFragment}.
 */
public class FlightDetailActivity extends FragmentActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_flight_detail);

		// Show the Up button in the action bar.
		getActionBar().setDisplayHomeAsUpEnabled(true);
		// number = intent.getStringExtra(FlightDetailFragment.ARG_ITEM_ID);

		// savedInstanceState is non-null when there is fragment state
		// saved from previous configurations of this activity
		// (e.g. when rotating the screen from portrait to landscape).
		// In this case, the fragment will automatically be re-added
		// to its container so we don't need to manually add it.
		// For more information, see the Fragments API guide at:
		//
		// http://developer.android.com/guide/components/fragments.html
		//

		if (savedInstanceState == null) {
			// Create the detail fragment and add it to the activity
			// using a fragment transaction.
			Intent mIntent = getIntent();
		

				FlightDetailFragment fragment = new FlightDetailFragment();
				fragment.setArguments(mIntent.getBundleExtra("flight_intent"));
				getSupportFragmentManager().beginTransaction()
						.add(R.id.flight_detail_container, fragment).commit();
		}
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
			case android.R.id.home: {
				// This ID represents the Home or Up button. In the case of this
				// activity, the Up button is shown. Use NavUtils to allow users
				// to navigate up one level in the application structure. For
				// more details, see the Navigation pattern on Android Design:
				//
				// http://developer.android.com/design/patterns/navigation.html#up-vs-back
				//
				NavUtils.navigateUpTo(this, new Intent(this,
						MyFlightsListActivity.class));
				return true;
			}
			case R.id.erase: {
				removeFlight(FlightManager.CUR_ITEM);
				Intent intent = new Intent(this, MyFlightsListActivity.class);
				startActivity(intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK));
				return true;
			}case R.id.comment: {
				DialogFragment newFragment = new CommentDialog();
				newFragment.show(getFragmentManager(), "dialog"); /* por hacer */
				return true;
			}case R.id.refresh: {
				Intent updateIntent = new Intent(this,UpdateService.class);
				updateIntent.putExtra("flight", FlightManager.CUR_ITEM.getFlightId());
				startService(updateIntent);
				Intent intent = new Intent(this, MyFlightsListActivity.class);
				intent.putExtra("flight", FlightManager.CUR_ITEM.getFlightId());
				intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
				startActivity(intent);
				return true;
			}

		}

		return super.onOptionsItemSelected(item);
	}

	public boolean onCreateOptionsMenu(Menu menu) {
		MenuInflater inflater = getMenuInflater();
		inflater.inflate(R.menu.flight_options, menu);
		return true;
	}
	private void removeFlight(Flight flight) {
		Set<String> flightsSet;
		String foundStr = null;
		SharedPreferences flights = getSharedPreferences("flightObjects",
				MODE_PRIVATE);

		SharedPreferences.Editor editor = flights.edit();
		flightsSet = flights.getStringSet("flightObjects", null);

		for (String str : flightsSet) {
			if (FlightImpl.fromJSON(str).getFlightId()
					.equals(flight.getFlightId())) {
				foundStr = str;
			}
		}

		flightsSet.remove(foundStr);
		editor.putStringSet("flightObjects", flightsSet);
		editor.commit();
		FlightManager.CUR_ITEM=null;
	}
}
