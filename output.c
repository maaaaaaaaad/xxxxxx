#include <string>
#include <vector>
#include <map>
#include <sstream>

using namespace std;

vector<string> split(string input, char delimiter) {
    vector<string> result;
    stringstream ss(input);
    string tmp;
 
    while (getline(ss, tmp, delimiter)) result.push_back(tmp);
 
    return result;
}


vector<int> solution(string today, vector<string> terms, vector<string> privacies) {
    vector<int> answer;
    string ss,date, type;
    map<string,int> t;
    
    int ty,dy,tm,dm,td,dd;
    
    
    vector<string> today_vector = split(today,'.');
    vector<string> date_vector;
    
    
    for(int i = 0 ; i < terms.size(); i ++)
    {
        stringstream ss(terms[i]);
        ss >>type >> date;
        t[type]=stoi(date);
    }
    
    
    for(int i = 0; i < privacies.size(); i++)
    {
        
        ty = stoi(today_vector[0]);
        tm = stoi(today_vector[1]);
        td = stoi(today_vector[2]);
        
        
        stringstream ss(privacies[i]);
        ss >> date >> type;
        date_vector = split(date,'.');
        
        
        dy = stoi(date_vector[0]);
        dm = stoi(date_vector[1]);
        dd = stoi(date_vector[2]);
        
        for(auto j : t)
        {
            if( j.first == type) 
            {
                dm += j.second;
                if (dm > 12) 
                {
                    while (dm > 12)
                    {
                        dm -= 12;
                        dy +=1;
                    }
                    
                }
                
                
                if ( dd -1 == 0 )
                {
                    dm -=1;
                    dd =28;
                }
                else
                    dd -=1;
                
                
                if ( ty > dy) 
                    answer.push_back(i+1);
                else if (ty == dy)
                {
                    if ( tm > dm) 
                        answer.push_back(i+1);
                    else if ( tm == dm)
                    {
                        if( td > dd)
                            answer.push_back(i+1);
                        else
                            break;
                        
                    }
                    else
                        break;
                        
                }
                else
                    break;
            }
            
        }
    }
    
    
    return answer;
}