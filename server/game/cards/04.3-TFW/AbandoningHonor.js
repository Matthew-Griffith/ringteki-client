const ProvinceCard = require('../../provincecard.js');
const { CardTypes } = require('../../Constants');

class AbandoningHonor extends ProvinceCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: context => context.player.role && context.player.role.hasTrait('fire'),
            effect: ability.effects.modifyProvinceStrength(2)
        });

        this.interrupt({
            title: 'Choose a dishonored character',
            when: {
                onBreakProvince: (event, context) => event.card === context.source && context.player.opponent
            },
            target: {
                cardType: CardTypes.Character,
                cardCondition: card => card.isDishonored,
                gameAction: ability.actions.discardFromPlay()
            }
        });
    }
}

AbandoningHonor.id = 'abandoning-honor';

module.exports = AbandoningHonor;
