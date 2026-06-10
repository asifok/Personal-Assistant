package com.spring_gemini.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring_gemini.serviceI.ChatServiceI;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class ChatController {
	
	@Autowired
	ChatServiceI chatServiceI;
	
	@GetMapping("/chat")
	public ResponseEntity<?> chat(@RequestParam String msg){
		return ResponseEntity.ok(chatServiceI.chatData(msg));
	}
	

}
