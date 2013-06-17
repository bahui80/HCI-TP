package com.example.quieroviajar;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.quieroviajar.objects.FlightContent;

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
	private FlightContent.FlightItem mItem;

	/**
	 * Mandatory empty constructor for the fragment manager to instantiate the
	 * fragment (e.g. upon screen orientation changes).
	 */
	public FlightDetailFragment() {
	}

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		if (getArguments().containsKey(ARG_ITEM_ID)) {
			// Load the dummy content specified by the fragment
			// arguments. In a real-world scenario, use a Loader
			// to load content from a content provider.
			mItem = FlightContent.ITEM_MAP.get(getArguments().getString(
					ARG_ITEM_ID));
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
					.setText(mItem.id);
			((TextView) rootView.findViewById(R.id.flight_detail_airline))
			.setText(mItem.airline);
			((TextView) rootView.findViewById(R.id.flight_detail_origin))
			.setText(mItem.origin);
			((TextView) rootView.findViewById(R.id.flight_detail_destiny))
			.setText(mItem.destiny);
			((TextView) rootView.findViewById(R.id.flight_detail_origin_date))
			.setText(mItem.departureDate.toString());
			((TextView) rootView.findViewById(R.id.flight_detail_destiny_date))
			.setText(mItem.arrivalDate.toString());
			((TextView) rootView.findViewById(R.id.flight_detail_origin_terminal))
			.setText(mItem.departureTerminal);
			((TextView) rootView.findViewById(R.id.flight_detail_destiny_terminal))
			.setText(mItem.arrivalTerminal);
			((TextView) rootView.findViewById(R.id.flight_detail_origin_gate))
			.setText(mItem.departureGate);
			((TextView) rootView.findViewById(R.id.flight_detail_destiny_gate))
			.setText(mItem.arrivalGate);
		}

		return rootView;
	}
}
