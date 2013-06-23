package com.example.quieroviajar;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import notificator.web.api.model.Flight;
import notificator.web.api.model.FlightImpl;
import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v4.app.ListFragment;
import android.view.View;
import android.widget.ListView;
import android.widget.SimpleAdapter;

/**
 * A list fragment representing a list of Flights. This fragment also supports
 * tablet devices by allowing list items to be given an 'activated' state upon
 * selection. This helps indicate which item is currently being viewed in a
 * {@link FlightDetailFragment}.
 * <p>
 * Activities containing this fragment MUST implement the {@link Callbacks}
 * interface.
 */
public class FlightListFragment extends ListFragment {

	/**
	 * The serialization (saved instance state) Bundle key representing the
	 * activated item position. Only used on tablets.
	 */
	private static final String STATE_ACTIVATED_POSITION = "activated_position";

	/**
	 * The fragment's current callback object, which is notified of list item
	 * clicks.
	 */
	private Callbacks mCallbacks = sDummyCallbacks;

	/**
	 * The current activated item position. Only used on tablets.
	 */
	private int mActivatedPosition = ListView.INVALID_POSITION;

	/**
	 * A callback interface that all activities containing this fragment must
	 * implement. This mechanism allows activities to be notified of item
	 * selections.
	 */
	public interface Callbacks {
		/**
		 * Callback for when an item has been selected.
		 */
		public void onItemSelected(String id);
	}

	/**
	 * A dummy implementation of the {@link Callbacks} interface that does
	 * nothing. Used only when this fragment is not attached to an activity.
	 */
	private static Callbacks sDummyCallbacks = new Callbacks() {
		@Override
		public void onItemSelected(String id) {
		}
	};

	/**
	 * Mandatory empty constructor for the fragment manager to instantiate the
	 * fragment (e.g. upon screen orientation changes).
	 */
	public FlightListFragment() {
	}

	/**
	 * A map of sample (dummy) items, by ID.
	 */
	public static Map<String, Flight> ITEM_MAP = new HashMap<String, Flight>();
		
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		loadList();
	}

	public void onResume() {
        super.onResume();
        loadList();
    }
	
	private void loadList(){
		// create flight list
				Set<String> flightsSet;
				SharedPreferences flights = this.getActivity().getSharedPreferences("flightObjects",android.content.Context.MODE_PRIVATE);
				flightsSet = flights.getStringSet("flightObjects", null);
				List<Flight> flightList = new ArrayList<Flight>();

				if(flightsSet != null){
					Integer i= 0;
					
					for(String flightJSON: flightsSet ){
						//El vuelo que estoy siguiendo				
						Flight curFlight = FlightImpl.fromJSON(flightJSON);
						flightList.add(curFlight);
						FlightManager.addItem(i.toString(), curFlight);
						i++;
					}
					//System.out.println(FlightManager.ITEM_MAP);
				}
				List<Map<String,String>> mapList = new ArrayList<Map<String,String>>();
				for(Flight curFlight: flightList){
					Map<String, String> map = new HashMap<String, String>();
					map.put("listTextAirline", curFlight.getAirlineName());
					map.put("listTextOrigin", curFlight.getDepartureCity());
					map.put("listTextDestiny", curFlight.getArrivalCity());
					map.put("listTextFlightNumber", curFlight.getFlightId());
					mapList.add(map);
				}
				
				// TODO: replace with a real list adapter.
				String[] from = new String[] { "listTextAirline", "listTextOrigin",
						"listTextDestiny", "listTextFlightNumber" };

				int[] to = new int[] { R.id.listTextAirline, R.id.listTextOrigin,
						R.id.listTextDestiny, R.id.listTextFlightNumber };

				setListAdapter(new SimpleAdapter(getActivity(), mapList,
						R.layout.my_flights_item, from, to));
	}
	@Override
	public void onViewCreated(View view, Bundle savedInstanceState) {
		super.onViewCreated(view, savedInstanceState);

		// Restore the previously serialized activated item position.
		if (savedInstanceState != null
				&& savedInstanceState.containsKey(STATE_ACTIVATED_POSITION)) {
			setActivatedPosition(savedInstanceState
					.getInt(STATE_ACTIVATED_POSITION));
		}
	}

	@Override
	public void onAttach(Activity activity) {
		super.onAttach(activity);

		// Activities containing this fragment must implement its callbacks.
		if (!(activity instanceof Callbacks)) {
			throw new IllegalStateException(
					"Activity must implement fragment's callbacks.");
		}

		mCallbacks = (Callbacks) activity;
	}

	@Override
	public void onDetach() {
		super.onDetach();

		// Reset the active callbacks interface to the dummy implementation.
		mCallbacks = sDummyCallbacks;
	}

	@Override
	public void onListItemClick(ListView listView, View view, int position,
			long id) {
		super.onListItemClick(listView, view, position, id);

		// Notify the active callbacks interface (the activity, if the
		// fragment is attached to one) that an item has been selected.
		mCallbacks.onItemSelected(Integer.toString(position));
	}

	@Override
	public void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		if (mActivatedPosition != ListView.INVALID_POSITION) {
			// Serialize and persist the activated item position.
			outState.putInt(STATE_ACTIVATED_POSITION, mActivatedPosition);
		}
	}

	/**
	 * Turns on activate-on-click mode. When this mode is on, list items will be
	 * given the 'activated' state when touched.
	 */
	public void setActivateOnItemClick(boolean activateOnItemClick) {
		// When setting CHOICE_MODE_SINGLE, ListView will automatically
		// give items the 'activated' state when touched.
		getListView().setChoiceMode(
				activateOnItemClick ? ListView.CHOICE_MODE_SINGLE
						: ListView.CHOICE_MODE_NONE);
	}

	public void setActivatedPosition(int position) {
		if (position == ListView.INVALID_POSITION) {
			getListView().setItemChecked(mActivatedPosition, false);
		} else {
			getListView().setItemChecked(position, true);
		}

		mActivatedPosition = position;
	}
}
