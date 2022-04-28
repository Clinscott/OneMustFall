const convo = [
    {
    character: 'triAngle',
    page: 1,
    narrative: 'Yo wassup',
    admin: 'generalGas',
    options: [
    {key: 'A', option: 'You must save the base TriAngle', nextPage:2},
    {key: 'D', option: 'Help us TriAngle, you are our only hope', nextPage:2}
    ]
    },
    {
    character: 'triAngle',
    page: 2 ,
    narrative: 'Why should I do that?',
    admin: 'generalGas',
    options: [
    {key: 'A', option: 'Because we have given unto you your life, and we need you to aid us now!', nextPage:3},
    {key: 'D', option: 'Please TriAngle, if you fail us, you too shall fall to the wrath of the One of Infinite Angles.', nextPage:4}
    ]
    },
    {
    character: 'triAngle',
    page: 3,
    narrative: 'That seams like a very good reason, but really, what\'s in it for me?',
    admin: 'generalGas',
    options: [
    {key: 'A', option: 'The One of Infinite Angles searches for all our destruction, yours included. This base is the last hope.', nextPage:4}
    ]
    },
    {
    character: 'triAngle',
    page: 4,
    narrative: 'That seams bad.',
    admin: 'generalGas',
    options: [
    {key: 'A', option: 'It is indeed Dire! Will you save us?', nextPage:5},
    {key: 'D', option: 'Once again TriAngle, help us, for you are our only hope', nextPage:5}
    ]
    },
    {
    character: 'triAngle',
    page: 5,
    narrative: 'Alright then, let\'s do this!',
    admin: 'generalGas',
    options: [
    {key: 'A', option: 'Thank You', nextPage:6},
    ]
    },
    {
    character: 'triAngle',
    page: 6,
    narrative: 'Don\'t thank me just yet. I gotta save your ass first.',
    admin: 'generalGas',
    options: [
    {key: 'A', option: '...', nextPage:6},
    ]
    },
    {
        character: 'triAngle',
        page: 7,
        narrative: 'Well. I did it. I saved your butts.',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'We are ever gratefull triAngle.', nextPage:8},
        {key: 'D', option: 'You are a true hero triAngle.', nextPage:8}
        ]
        },
        {
        character: 'triAngle',
        page: 8 ,
        narrative: 'So what did I get out of that? Other than being awesome.',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'With those angles you picked up we can improve you. But at a cost.', nextPage:9},
        ]
        },
        {
        character: 'triAngle',
        page: 9,
        narrative: 'Oh? Really? Like How?',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'We can make you take more damage.', nextPage:10},
        {key: 'D', option: 'We can make the base safer.', nextPage:11},
        {key: 'D', option: 'We can make your attacks more effective.', nextPage:12}
        ]
        },
        {
        character: 'triAngle',
        page: 10,
        narrative: 'I feel Tougher. Can we improve anything else?',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'We can make the base safer.', nextPage:13},
        {key: 'D', option: 'We can make your attacks more effective.', nextPage:14}
        ]
        },
        {
        character: 'triAngle',
        page: 11,
        narrative: 'The Base looks much mightier! Can we improve anything else?',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'We can make you take more damage.', nextPage:15},
        {key: 'D', option: 'We can make your attacks more effective.', nextPage:14}
        ]
        },
        {
        character: 'triAngle',
        page: 12,
        narrative: 'I have true fists of fury now! Can we improve anything else?',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'We can make you take more damage.', nextPage:15},
        {key: 'D', option: 'We can make the base safer.', nextPage:13}
        ]
        },
        {
        character: 'triAngle',
        page: 13,
        narrative: 'The Base looks much mightier! Can we improve anything else?',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'I am afraid not. We need more angles to improve something else.', nextPage:16},
        ]
        },
        {
        character: 'triAngle',
        page: 14,
        narrative: 'I have true fists of fury now! Can we improve anything else?',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'I am afraid not. We need more angles to improve something else.', nextPage:16},
        ]
        },
        {
        character: 'triAngle',
        page: 15,
        narrative: 'I feel tougher, like an Ox. Can we improve anything else?',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'I am afraid not. We need more angles to improve something else.', nextPage:16},
        ]
        },
        {
        character: 'triAngle',
        page: 16,
        narrative: 'How do I get more angles?',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'Have no fear, for the enemy builds anew. Soon they will come again', nextPage:17},
        ]
        },
        {
        character: 'triAngle',
        page: 17,
        narrative: 'Bring em on! That was almost too easy last time.',
        admin: 'generalGas',
        options: [
        {key: 'A', option: '*mumbling* That is what the last one said.', nextPage:18},
        ]
        },
        {
        character: 'triAngle',
        page: 18,
        narrative: 'I am gonna become The triFighter!',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'We hope so.', nextPage:18},
        {key: 'D', option: 'May we be forgiven for what we had to do...', nextPage:18}
        ]
        },
        {
        character: 'triAngle',
        page: 19,
        narrative: 'Once again I am victorious!',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'See the power of your fists in action.', nextPage:20},
        {key: 'D', option: 'You are the saviour of mankind indeed.', nextPage:20}
        ]
        },
        {
        character: 'triAngle',
        page: 20,
        narrative: 'What comes next?',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'The enemy is nowhere near done. More foes will come.', nextPage:21},
        {key: 'D', option: 'You must prepare yourself once again.', nextPage:21}
        ]
        },
        {
        character: 'triAngle',
        page: 21,
        narrative: 'I get to be stronger again?',
        admin: 'generalGas',
        options: [
        {key: 'A', option: 'Yes fighter you do.', nextPage:9}
        ]
        },
];

export {convo};