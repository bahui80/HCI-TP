package com.example.quieroviajar;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

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
			FlightManager.CUR_ITEM = mItem;
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
			((TextView) rootView
					.findViewById(R.id.flight_detail_airport_origin))
					.setText(mItem.getDepartureAirport());
			((TextView) rootView
					.findViewById(R.id.flight_detail_airport_destiny))
					.setText(mItem.getArrivalAirport());
			((TextView) rootView
					.findViewById(R.id.flight_detail_origin_terminal))
					.setText(" " + mItem.getDepartureTerminal());
			((TextView) rootView
					.findViewById(R.id.flight_detail_destiny_terminal))
					.setText(" " + mItem.getArrivalTerminal());
			((TextView) rootView.findViewById(R.id.flight_detail_origin_gate))
					.setText(" " + mItem.getDepartureGate());
			((TextView) rootView.findViewById(R.id.flight_detail_destiny_gate))
					.setText(" " + mItem.getArrivalGate());
			((TextView) rootView.findViewById(R.id.flight_detail_departure_day))
					.setText(mItem.getDepartureDay());
			((TextView) rootView.findViewById(R.id.flight_detail_baggage))
					.setText(" " + mItem.getArrivalBaggageGate());

			String status = mItem.getStatus();
			TextView view = ((TextView) rootView
					.findViewById(R.id.flight_detail_status));
			// ShapeDrawable background = (ShapeDrawable)
			// getResources().getDrawable((R.drawable.rectangle));
			if (status.equals("D")) {
				/*
				 * S = PLANIFICADO a=ACTIVO D=DESVIADO l=ATERRIZADO C=CANCELADO
				 * r=REDIRECCIONADO
				 */

				view.setVisibility(TextView.VISIBLE);
				// background.getPaint().setColor(
				// getResources().getColor(R.color.orange));
				// view.setBackgroundDrawable(background);
				view.setText(getString(R.string.diverted));
				view.setTextColor(getResources().getColor(R.color.orange));

			} else if (status.equals("S")) {

				view.setVisibility(TextView.VISIBLE);
				// background.getPaint().setColor(
				// getResources().getColor(R.color.green));
				// view.setBackgroundDrawable(background);
				view.setText(getString(R.string.planned));
				view.setTextColor(getResources().getColor(R.color.green));

			} else if (status.equals("A")) {
				view.setVisibility(TextView.VISIBLE);
				// background.getPaint().setColor(
				// getResources().getColor(R.color.green));
				// view.setBackgroundDrawable(background);
				view.setText(getString(R.string.active));
				view.setTextColor(getResources().getColor(R.color.green));

			} else if (status.equals("L")) {
				view.setVisibility(TextView.VISIBLE);
				// background.getPaint().setColor(
				// getResources().getColor(R.color.green));
				// view.setBackgroundDrawable(background);
				view.setText(getString(R.string.landed));
				view.setTextColor(getResources().getColor(R.color.green));

			} else if (status.equals("C")) {
				view.setVisibility(TextView.VISIBLE);
				// background.getPaint().setColor(
				// getResources().getColor(R.color.red));
				// view.setBackgroundDrawable(background);
				view.setText(getString(R.string.canceled));
				view.setTextColor(getResources().getColor(R.color.red));

			} else if (status.equals("R")) {
				view.setVisibility(TextView.VISIBLE);
				// background.getPaint().setColor(
				// getResources().getColor(R.color.red));
				// view.setBackgroundDrawable(background);
				view.setText(getString(R.string.redirected));
				view.setTextColor(getResources().getColor(R.color.red));

			}
			String departureScheduledTime = mItem.getDepartureScheduledTime();
			String departureActualTime;
			int departureGateDelay = mItem.getDepartureGateDelay();
			int departureRunwayDelay = mItem.getDepartureRunwayDelay();
			int totalDepartureDelay = departureGateDelay + departureRunwayDelay;

			// Seteo de la hora de despegue

			if (totalDepartureDelay == 0) {
				TextView actualTime = ((TextView) rootView
						.findViewById(R.id.flight_detail_origin_actual_time));
				actualTime.setText(departureScheduledTime);
			} else {
				SimpleDateFormat sdf = new SimpleDateFormat("hh:mm");
				Date date = null;
				try {
					date = sdf.parse(departureScheduledTime);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				date.setMinutes(date.getMinutes() + totalDepartureDelay);
				TextView actualTime = ((TextView) rootView
						.findViewById(R.id.flight_detail_origin_actual_time));
				String aux;
				String aux2;
				if (date.getHours() < 10) {
					aux = "0" + date.getHours();
				} else {
					aux = "" + date.getHours();
				}

				if (date.getMinutes() < 10) {
					aux2 = "0" + date.getMinutes();
				} else {
					aux2 = "" + date.getMinutes();
				}
				actualTime.setText(aux + ":" + aux2);
				TextView scheduledTime = ((TextView) rootView
						.findViewById(R.id.flight_detail_origin_scheduled_time));
				scheduledTime.setVisibility(TextView.VISIBLE);
				scheduledTime.setText("(" + getString(R.string.scheduled) + " "
						+ departureScheduledTime + ")");

			}

			String arrivalScheduledTime = mItem.getArrivalScheduledTime();
			String arrivalActualTime;
			int arrivalGateDelay = mItem.getArrivalGateDelay();
			int arrivalRunwayDelay = mItem.getArrivalRunwayDelay();

			// Seteo del horario de llegada

			if (totalDepartureDelay == 0) {
				TextView actualTime = ((TextView) rootView
						.findViewById(R.id.flight_detail_destiny_actual_time));
				actualTime.setText(arrivalScheduledTime);

			} else {
				SimpleDateFormat sdf = new SimpleDateFormat("hh:mm");
				Date date = null;
				try {
					date = sdf.parse(arrivalScheduledTime);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				date.setMinutes(date.getMinutes() + totalDepartureDelay);
				TextView actualTime = ((TextView) rootView
						.findViewById(R.id.flight_detail_destiny_actual_time));
				String aux;
				String aux2;
				if (date.getHours() < 10) {
					aux = "0" + date.getHours();
				} else {
					aux = "" + date.getHours();
				}

				if (date.getMinutes() < 10) {
					aux2 = "0" + date.getMinutes();
				} else {
					aux2 = "" + date.getMinutes();
				}
				actualTime.setText(aux + ":" + aux2);
				TextView scheduledTime = ((TextView) rootView
						.findViewById(R.id.flight_detail_destiny_scheduled_time));
				scheduledTime.setVisibility(TextView.VISIBLE);
				scheduledTime.setText("(" + getString(R.string.scheduled) + " "
						+ arrivalScheduledTime + ")");

			}

			// Seteo de el horario de puerta de salida
			String departureGateScheduledTime = mItem
					.getDepartureScheduledGateTime();
			String departureGateActualTime = mItem.getDepartureActualGateTime();

			if (!(departureGateScheduledTime.equals("null"))) {
				TextView actualTime = ((TextView) rootView
						.findViewById(R.id.flight_detail_origin_actual_gate_time));
				actualTime.setVisibility(TextView.VISIBLE);
				if (departureGateDelay == 0) {
					actualTime.setText(getString(R.string.bording) + " "
							+ departureGateScheduledTime);

				} else {
					actualTime.setText(getString(R.string.bording) + " "
							+ departureGateActualTime);

				}

			}

			String arrivalGateScheduledTime = mItem
					.getArrivalScheduledGateTime();
			String arrivalGateActualTime = mItem.getArrivalActualGateTime();

			if (!(arrivalGateScheduledTime.equals("null"))) {
				TextView actualTime = ((TextView) rootView
						.findViewById(R.id.flight_detail_destiny_actual_gate_time));
				actualTime.setVisibility(TextView.VISIBLE);
				if (arrivalGateDelay == 0) {
					actualTime.setText(getString(R.string.unboarding) + " "
							+ arrivalGateScheduledTime);

				} else {
					actualTime.setText(getString(R.string.unboarding) + " "
							+ arrivalGateActualTime);

				}

			}
			String departureDate = mItem.getDepartureDay();
			String arrivalDate = mItem.getArrivalDay();
			if (!(departureDate.equals(arrivalDate))) {
				((TextView) rootView
						.findViewById(R.id.flight_detail_destiny_day))
						.setVisibility(TextView.VISIBLE);
			}
		}

		return rootView;
	}
}
