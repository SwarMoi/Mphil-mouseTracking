library(dplyr)
library(lme4)

df1=read.csv(file.choose(), header = T)

df2<- subset(df1,Condition !='match')

df3<- subset(df1,Condition =='match')

df3$choice<-as.factor(df3$choice)


df2$choice<-as.factor(df2$choice)
df2$Condition<-as.factor(df2$Condition)

m1<-lmer(AUC~choice*Condition+(1|Subject)+(1|Item),data=df2)

m2<-lmer(AUC~choice+(1|Subject)+(1|Item),data=df3)


X <- model.matrix (m1, df2)
