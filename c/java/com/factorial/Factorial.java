package com.factorial;

import java.security.Timestamp;

public class Factorial {

	public static void main(String[] args) {
		int c=0;
		long t1=System.nanoTime();
		for (long i=0; i<1000000;i++){
			
			for (long j=0; j<50;j++){
				
				c++;
				factorial(j);
				
			}
		}
		long t2=System.nanoTime();
		System.out.println((float)(t2-t1)/1000000000);

	}
	
	public static long factorial (long n){
		if(n==0){
			return 1;
		}else{
			return n*factorial(n-1);
		}
	}

}
