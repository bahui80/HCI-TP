package com.example.quieroviajar;

import java.util.HashMap;
import java.util.Map;

import notificator.web.api.model.Flight;

public class FlightManager{

	public static Map<String, Flight> ITEM_MAP = new HashMap<String, Flight>();
	public static Flight CUR_ITEM;
	
	public static void addItem(String string, Flight flight){
		ITEM_MAP.put(string, flight);
	}
}
