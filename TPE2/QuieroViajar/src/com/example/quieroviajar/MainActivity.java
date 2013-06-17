package com.example.quieroviajar;

import android.app.Activity;
import android.app.LocalActivityManager;
import android.app.TabActivity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.TabHost;
import android.widget.TabHost.TabSpec;
import android.widget.TabWidget;

public class MainActivity extends TabActivity{
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main_activity);
        TabHost tabHost=getTabHost();
        TabWidget widget = new TabWidget(this);
        widget.setId(android.R.id.tabs);


		// Tab for my flights list
		TabSpec myFlights = tabHost.newTabSpec(this.getString(R.string.my_flights));
		myFlights.setIndicator(this.getString(R.string.my_flights));
		
		Intent myFlightsIntent = new Intent(this, MyFlightsList.class);
		myFlights.setContent(myFlightsIntent);

		// Tab for search flight
		TabSpec searchFlight = tabHost.newTabSpec(this.getString(R.string.search_flight));
		searchFlight.setIndicator(this.getString(R.string.search_flight));
		
		Intent searchFlightIntent = new Intent(this, SearchFlight.class);
		searchFlight.setContent(searchFlightIntent);

		// Tab for sales
		TabSpec sales = tabHost.newTabSpec(this.getString(R.string.sales));
		sales.setIndicator(this.getString(R.string.sales));
		
		Intent salesIntent = new Intent(this, Sales.class);
		sales.setContent(salesIntent);
		// Adding all TabSpec to TabHost
		tabHost.addTab(myFlights); // Adding my flights tab
		tabHost.addTab(searchFlight); // Adding search flight tab
		tabHost.addTab(sales); // Adding sales tab

	}

}
