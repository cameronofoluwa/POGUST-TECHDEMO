public with sharing class RecentPortalNewsController {
 
    @AuraEnabled(cacheable=true)
    public static List<Portal_News__c> getRecentNews() {
        return [
            SELECT Id, Name, News_Title__c, News_Body__c, CreatedById, CreatedDate
            FROM Portal_News__c
            WITH SECURITY_ENFORCED
            ORDER BY CreatedDate DESC
            LIMIT 3
        ];
    }
}
