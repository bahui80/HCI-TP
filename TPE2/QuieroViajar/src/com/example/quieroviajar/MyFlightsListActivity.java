package com.example.quieroviajar;

import java.io.Serializable;

import notificator.activities.CommentDialog;
import notificator.activities.DealsActivity;
import notificator.activities.SettingActivity;
import notificator.web.api.model.Flight;
import android.app.DialogFragment;
import android.content.Intent;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v4.app.FragmentActivity;
import android.util.Log;
import android.view.ActionMode;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

public class MyFlightsListActivity extends FragmentActivity implements
		FlightListFragment.Callbacks {
	


	/**
	 * Whether or not the activity is in two-pane mode, i.e. running on a tablet
	 * device.
	 */
	private boolean mTwoPane;
	ActionMode.Callback mCallback;
	ActionMode mMode;
	private Menu menu;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_flight_list);
		PreferenceManager.setDefaultValues(this, R.xml.preferences, false);

		if (findViewById(R.id.flight_detail_container) != null) {
			// The detail container view will be present only in the
			// large-screen layouts (res/values-large and
			// res/values-sw600dp). If this view is present, then the
			// activity should be in two-pane mode.
			mTwoPane = true;

			// In two-pane mode, list items should be given the
			// 'activated' state when touched.
			((FlightListFragment) getSupportFragmentManager().findFragmentById(
					R.id.flight_list)).setActivateOnItemClick(true);
		}

		// TODO: If exposing deep links into your app, handle intents here.
	}

	/**
	 * Callback method from {@link FlightListFragment.Callbacks} indicating that
	 * the item with the given ID was selected.
	 */
	@Override
	public void onItemSelected(String id) {
		Flight flight = FlightManager.ITEM_MAP.get(id);
	
		Bundle arguments = new Bundle();
		arguments.putSerializable("flight", (Serializable) flight);
		
		if (mTwoPane) {
			// In two-pane mode, show the detail view in this activity by
			// adding or replacing the detail fragment using a
			// fragment transaction.
			MenuItem erase = menu.findItem(R.id.erase);
			MenuItem refresh = menu.findItem(R.id.refresh);
			MenuItem comment = menu.findItem(R.id.comment);
			erase.setVisible(true);
			refresh.setVisible(true);
			comment.setVisible(true);

			FlightDetailFragment fragment = new FlightDetailFragment();
			fragment.setArguments(arguments);
			getSupportFragmentManager().beginTransaction()
					.replace(R.id.flight_detail_container, fragment).commit();

		} else {
			// In single-pane mode, simply start the detail activity
			// for the selected item ID.

			Intent detailIntent = new Intent(this, FlightDetailActivity.class);			
			detailIntent.putExtra("flight_intent", arguments);
			startActivity(detailIntent);
		}
	}

	public boolean onCreateOptionsMenu(Menu menu) {
		MenuInflater inflater = getMenuInflater();
		inflater.inflate(R.menu.my_flights_menu, menu);
		MenuItem erase = menu.findItem(R.id.erase);
		MenuItem refresh = menu.findItem(R.id.refresh);
		MenuItem comment = menu.findItem(R.id.comment);

		erase.setVisible(false);
		refresh.setVisible(false);
		comment.setVisible(false);
		this.menu = menu;

		return true;
	}

	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
		case R.id.sales_tab: {
			Intent activityIntent = new Intent(this, DealsActivity.class);
			startActivity(activityIntent);
			return true;
		}
		case R.id.settings: {
			Intent activityIntent = new Intent(this, SettingActivity.class);
			startActivity(activityIntent);
			return true;
		}
		case R.id.comment: {
			System.out.println("CLICKIEEEEEEEEEEEEEEEEEEEEEE");
			DialogFragment newFragment = new CommentDialog();
			newFragment.show(getFragmentManager(), "dialog"); /* por hacer */
			return true;
		}
		case R.id.add_flight: {
			startSearch(null, false, null, false);
		
			return true;
		}
		}
		return super.onOptionsItemSelected(item);
	}

}
