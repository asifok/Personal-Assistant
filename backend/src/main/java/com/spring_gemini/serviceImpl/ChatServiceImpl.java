package com.spring_gemini.serviceImpl;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring_gemini.serviceI.ChatServiceI;

@Service
public class ChatServiceImpl implements ChatServiceI {
	
	@Autowired
	ChatClient.Builder builder;

	@Override
	public String chatData(String prompt) {
		String response = builder.build().prompt(prompt).call().content();
		return response;
	}
}
