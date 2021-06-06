/* 
    Three components of a checklist: Title, Section, List
    
    Checklist storage ideas:
        One root Object which contains checklist id, checklist title, 
            and reference to the first section
        The first section will have reference to consecutive sections and the
            last one will have 0 in the value of reference  
*/

Nested Model
---------------

{
    "Web Application Hacker's Handbook Checklist": {
        "Recon and Analysis": [
            {
                "listItemType": "child", 
                "listItemText": "Map Visible Content",
            },
            {
                "listItemType": "parent",
                "listItemText": "Discover hidden & default content",
                "childList": [
                    {
                        "listItemType": "child",
                        "listItemText": "Try different User-agents to find differences in content"
                    }
                ]
            },
            {

            }
        ],
        "Test handling of access": [],
        "Test handling of input": []
    }
}

Flat Model
---------------
Checklist => id , title , first section Reference

Section  => id, title, second section reference, list reference

List => id, listItemType, listItemText, childList

