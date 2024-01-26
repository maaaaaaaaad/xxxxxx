#include <stdio.h>
main()
{
	int in_num=9;
	int arr[3][3]={0,0,0,0,0,0,0,0,0};
	int a,b,c,r;
	int k=0,p;
	int temp[3][3]={0,0,0,0,0,0,0,0,0};
	printf("Total Solution Set\n\n");
	for(in_num=9; in_num<=12; ++in_num){
	k=2;
	for(a=1; a<=6; ++a)
		for(b=1; b<=6; ++b)
			for(c=1; c<=6; ++c)
				for(r=1; r<=6; ++r){
					if(a+b+c==in_num &&a!=b && b!=c&& a!=c && c!=r&& in_num-(r+c)>0 && in_num-(r+c)<=6  && in_num-(r+b)>0 && in_num-(r+b)<=6)
					{
						arr[0][0]=a;			arr[0][1]=b;			arr[0][2]=c;
						arr[1][0]=in_num-(r+c); arr[1][1]=c;			arr[1][2]=r; 
						arr[2][0]=in_num-(r+b);	arr[2][1]=r;			arr[2][2]=b;
						if( in_num-(r+c) != r && in_num-(r+b)!=r && in_num-(r+b)!=b && in_num-(r+c)!=c)
						{
							if(!(arr[1][0]==b && arr[1][1]==c && arr[1][2]==a) )
							if(!(arr[1][0]==b && arr[1][1]==a && arr[1][2]==c ))
							if(!(arr[1][0]==c && arr[1][1]==b && arr[1][2]==a ))
							if(!(arr[1][0]==c && arr[1][1]==a && arr[1][2]==b ))
							if(!(arr[1][0]==a && arr[1][1]==b && arr[1][2]==c ))
							if(!(arr[1][0]==a && arr[1][1]==c && arr[1][2]==b ))
							if(k>0){
								printf("%d %d,%d,%d ",in_num, arr[0][0], arr[0][1], arr[0][2]);
								printf("%d,%d,%d ", arr[1][0], arr[1][1], arr[1][2]);
								printf("%d,%d,%d\n", arr[2][0], arr[2][1], arr[2][2]);
								k--;
							}
 
						}				
					}
				}
	}		
 
 
	printf("end");
	getchar();
}
