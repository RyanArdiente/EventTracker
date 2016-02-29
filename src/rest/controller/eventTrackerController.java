package rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import rest.dao.etDAO;
import rest.pojos.Event;

@Controller
public class eventTrackerController
{
	@Autowired
	public etDAO etdao;
	
	@ResponseBody
	@RequestMapping("ping")
	public String ping()
	{
		return "pong";
	}
	@ResponseBody
	@RequestMapping(path="grabAll", method=RequestMethod.GET)
	public List<Event> allEvents()
	{
		return etdao.getAllEvents();
	}
	@ResponseBody
	@RequestMapping(path="event/search", method=RequestMethod.PUT)
	public List<Event> eventById(@RequestBody String search)
	{
		return etdao.getEventBySearch(search);
	}
	@ResponseBody
	@RequestMapping(path="createEvent", method=RequestMethod.PUT)
	public boolean createEvent(@RequestBody String event){
		etdao.createEvent(event);
		return true;
	}
	@ResponseBody
	@RequestMapping(path="editEvent", method=RequestMethod.POST)
	public boolean editEvent(@RequestBody String event){
		return etdao.editEvent(event);
	}
	@ResponseBody
	@RequestMapping(path="deleteAllEvents", method=RequestMethod.DELETE)
	public void deleteAllEvents(){
		System.out.println("controller delete");
		etdao.deleteAll();
	}
}
