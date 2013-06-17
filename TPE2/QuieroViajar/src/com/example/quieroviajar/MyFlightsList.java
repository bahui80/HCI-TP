package com.example.quieroviajar;

import com.example.quieroviajar.objects.FlightContent;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;

public class MyFlightsList extends FragmentActivity implements
		FlightListFragment.Callbacks {
	/**
	 * Whether or not the activity is in two-pane mode, i.e. running on a tablet
	 * device.
	 */
	private boolean mTwoPane;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_flight_list);

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
		String number = FlightContent.ITEMS.get(Integer.parseInt(id)).get(
				"listTextFlightNumber");
		if (mTwoPane) {
			// In two-pane mode, show the detail view in this activity by
			// adding or replacing the detail fragment using a
			// fragment transaction.
			Bundle arguments = new Bundle();
			arguments.putString(FlightDetailFragment.ARG_ITEM_ID, number);
			FlightDetailFragment fragment = new FlightDetailFragment();
			fragment.setArguments(arguments);
			getSupportFragmentManager().beginTransaction()
					.replace(R.id.flight_detail_container, fragment).commit();

		} else {
			// In single-pane mode, simply start the detail activity
			// for the selected item ID.
			Intent detailIntent = new Intent(this, FlightDetailActivity.class);
			detailIntent.putExtra(FlightDetailFragment.ARG_ITEM_ID, number);
			startActivity(detailIntent);
		}
	}

}
