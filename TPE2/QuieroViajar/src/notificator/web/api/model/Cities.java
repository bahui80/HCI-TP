package notificator.web.api.model;

public interface Cities {

	public String getCityId();
	public String getCityName();
	public Double getLongitude();
	public Double getLatitude();
	public Double distanceTo(Double latitude, Double longitude);
}
