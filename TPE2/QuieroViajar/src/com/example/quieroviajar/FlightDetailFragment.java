package com.example.quieroviajar;

import notificator.web.api.model.Flight;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

/**
 * A fragment representing a single Flight detail screen. This fragment is
 * either contained in a {@link FlightListActivity} in two-pane mode (on
 * tablets) or a {@link FlightDetailActivity} on handsets.
 */
public class FlightDetailFragment extends Fragment {
	/**
	 * The fragment argument representing the item ID that this fragment
	 * represents.
	 */
	public static final String ARG_ITEM_ID = "item_id";

	/**
	 * The dummy content this fragment is presenting.
	 */
	private Flight mItem;

	/**
	 * Mandatory empty constructor for the fragment manager to instantiate the
	 * fragment (e.g. upon screen orientation changes).
	 */
	public FlightDetailFragment() {
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		if (getArguments().containsKey("flight")) {
			// Load the dummy content specified by the fragment
			// arguments. In a real-world scenario, use a Loader
			// to load content from a content provider.
			mItem = (Flight) getArguments().getSerializable("flight");
			System.out.println(mItem.getAirlineName());
			
		}
	}

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		View rootView = inflater.inflate(R.layout.fragment_flight_detail,
				container, false);

		// Show the dummy content as text in a TextView.
		if (mItem != null) {
			((TextView) rootView.findViewById(R.id.flight_detail_number))
					.setText(mItem.getFlightId());
			((TextView) rootView.findViewById(R.id.flight_detail_airline))
			.setText(mItem.getAirlineName());
			((TextView) rootView.findViewById(R.id.flight_detail_origin))
			.setText(mItem.getDepartureCity());
			((TextView) rootView.findViewById(R.id.flight_detail_destiny))
			.setText(mItem.getArrivalCity());
			((TextView) rootView.findViewById(R.id.flight_detail_airport_origin))
			.setText(mItem.getDepartureAirport());
			((TextView) rootView.findViewById(R.id.flight_detail_airport_destiny))
			.setText(mItem.getArrivalAirport());
			((TextView) rootView.findViewById(R.id.flight_detail_origin_date))
			.setText(mItem.getDepartureScheduledTime());
			((TextView) rootView.findViewById(R.id.flight_detail_destiny_date))
			.setText(mItem.getArrivalScheduledTime());
			((TextView) rootView.findViewById(R.id.flight_detail_origin_terminal))
			.setText(mItem.getDepartureTerminal());
			((TextView) rootView.findViewById(R.id.flight_detail_destiny_terminal))
			.setText(mItem.getArrivalTerminal());
			((TextView) rootView.findViewById(R.id.flight_detail_origin_gate))
			.setText(mItem.getDepartureGate());
			((TextView) rootView.findViewById(R.id.flight_detail_destiny_gate))
			.setText(mItem.getArrivalGate());
		}

		return rootView;
	}
}
