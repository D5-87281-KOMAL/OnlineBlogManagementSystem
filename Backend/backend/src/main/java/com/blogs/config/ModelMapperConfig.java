package com.blogs.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
	@Bean
	public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper;
    
	
	}
	
//	@Bean
//	public ObjectMapper objectMapper() {
//	    ObjectMapper mapper = new ObjectMapper();
//	    mapper.getFactory().setStreamWriteConstraints(StreamWriteConstraints.builder().maxNestingDepth(5000).build());
//	    return mapper;
//	}
	


//@Configuration
//public class ModelMapperConfig {
//    @Bean
//    public ModelMapper modelMapper() {
//        ModelMapper modelMapper = new ModelMapper();
//        modelMapper.getConfiguration()
//                   .setMatchingStrategy(MatchingStrategies.STRICT);
//        return modelMapper;
//    }



}


