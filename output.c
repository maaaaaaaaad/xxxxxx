#include <string>
#include <vector>
#include <iostream>
#include <algorithm>
#include <cstring>

using namespace std;

#define ALP_MAX 150
#define COP_MAX 150
#define COST_MAX 1e9

int mincost[ALP_MAX+1][COP_MAX+1];
vector<vector<int> > arrP;
int alp_max, cop_max;

int getmincost(int alp, int cop) {
	if(alp >= alp_max && cop >= cop_max){
		return 0;
	}

	alp = min(alp, alp_max);
    cop = min(cop, cop_max);

	int &result = mincost[alp][cop];
    if(result != -1)
    	return result;
    
    result = COST_MAX;

    if(alp < alp_max)
    	result = min(result, getmincost(alp+1, cop) + 1);
    if(cop < cop_max)
    	result = min(result, getmincost(alp, cop+1) + 1);

    for (auto &p : arrP) {
        if (alp < p[0] || cop < p[1]) {
            continue;
        }
        result = min(result, getmincost(alp+p[2], cop+p[3]) + p[4]);
    }

    return result;
}

int solution(int alp, int cop, vector<vector<int>> problems) {
    arrP = problems;

    alp_max = alp;
    cop_max = cop;

    for (auto &p : problems) {
        alp_max = max(alp_max, p[0]);
        cop_max = max(cop_max, p[1]);
    }
    
    memset(mincost,-1,sizeof(mincost));
    mincost[alp_max][cop_max] = 0;

    return getmincost(alp, cop);
}