package rest.dao;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import rest.pojos.Event;
import rest.pojos.Search;


@Transactional
public class etDAO
{
	@PersistenceContext
	private EntityManager em;
	
	public etDAO(){
		
	}
	public List<Event> getAllEvents(){
		return em.createNamedQuery("Event.getAllEvents").getResultList();
	}
	public List<Event> getEventBySearch(String search) {
		System.out.println(search);
		ObjectMapper mapper = new ObjectMapper();
		try
		{
			Search s = mapper.readValue(search, Search.class);
			if(s.getLimit().equals("place")){
				return em.createNamedQuery("Event.searchByplace", Event.class).setParameter("place", s.getText()).getResultList();
			}
			else if(s.getLimit().equals("itemName"))
			{
				return em.createNamedQuery("Event.searchByitemName", Event.class).setParameter("itemName", s.getText()).getResultList();
			}
			else{
				return new ArrayList<Event>();
			}
		} catch (IOException e)
		{
			e.printStackTrace();
			return new ArrayList<Event>();
		}
		

//		return em.createNamedQuery("Event.getAllEvents").setParameter("sessionUser", sessionUserId).getResultList();
	}
	public String createEvent(String event){
		ObjectMapper mapper = new ObjectMapper();
		Event ev = null;
		try
		{
			ev = mapper.readValue(event, Event.class);
		} catch (IOException e)
		{
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		em.merge(ev);
		em.persist(ev);
		
		return ev.getItemName() + " was stored";
	}
	public boolean editEvent(String event) 
	{
		ObjectMapper om = new ObjectMapper();
		Event e = null;
		try
		{
			e = om.readValue(event, Event.class);
		} catch (IOException e1)
		{
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		em.merge(e);
		return true;
	}
	public void deleteAll(){
		 em.createNamedQuery("Event.deleteAllEvents").executeUpdate();
	}
	
}
