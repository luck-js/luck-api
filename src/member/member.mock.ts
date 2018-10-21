/*
*   generate by https://www.json-generator.com/#
*/
/*
*   generate by https://www.json-generator.com/#
*/

export const ORGANISER_INITIAL_MOCK = {
    'id': '0',
    'name': 'Janet',
    'relationId': '53ae0bde-1c3c-4db7-90f7-14366243cdb9',
    'eventMemberRole': {
        'type': 'ORGANISER',
        'matchedMemberId': null,
        'abilityToRandom': false
    }
};

export const PARTICIPANT_INITIAL_LIST_MOCK = [
    {
        'id': '1',
        'name': 'Kline',
        'relationId': '8f1b628e-ce03-442d-b100-b45bb25dd6e6',
        'eventMemberRole': {
            'type': 'PARTICIPANT',
            'matchedMemberId': null,
            'abilityToRandom': true
        }
    },
    {
        'id': '2',
        'name': 'Le',
        'relationId': '3b967f8a-159a-4b6c-be6e-793a86373137',
        'eventMemberRole': {
            'type': 'PARTICIPANT',
            'matchedMemberId': null,
            'abilityToRandom': true
        }
    },
    {
        'id': '3',
        'name': 'Barlow',
        'relationId': '45d3247e-42ce-4af9-b481-7f578fe7cb9f',
        'eventMemberRole': {
            'type': 'PARTICIPANT',
            'matchedMemberId': null,
            'abilityToRandom': true
        }
    },
    {
        'id': '4',
        'name': 'Jean',
        'relationId': '0d0596af-90ff-4b96-8443-5663d775a79b',
        'eventMemberRole': {
            'type': 'PARTICIPANT',
            'matchedMemberId': null,
            'abilityToRandom': true
        }
    },
    {
        'id': '5',
        'name': 'Sheila',
        'relationId': 'baaa99d3-a6aa-41c6-8f5c-601cdea6b586',
        'eventMemberRole': {
            'type': 'PARTICIPANT',
            'matchedMemberId': null,
            'abilityToRandom': true
        }
    }
];

export const MEMBER_INITIAL_LIST_MOCK = [ORGANISER_INITIAL_MOCK, ...PARTICIPANT_INITIAL_LIST_MOCK];
