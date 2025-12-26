(function(){
  const datasets = {
    '1': [
      { tierLabel: "\uD83C\uDFC6 1st Place (11 points)", points: 11, participants: [
        "Meriem Ihdouka","Myriame El Idrissi Raghni","Abdelilah Benlhaoud","Hanaa Rharib" ] },
      { tierLabel: "\uD83E\uDD48 2nd Place (10 points)", points: 10, participants: [ "Hajar Belkhbizi","Zakaria Racaf" ] },
      { tierLabel: "\uD83E\uDD49 3rd Place (9 points)", points: 9, participants: [
        "Moulay Thami El Bouaanani","Mohammed El Ghrabli","Anas Farid","Manal Aboudihaj","Abdelghani Fimoud" ] },
      { tierLabel: "4th Place (8 points)", points: 8, participants: [ "Yassine El Mouttaki" ] },
      { tierLabel: "5th Place (7 points)", points: 7, participants: [
        "El Mehdi Moualim","Youssef Bassa","Youssef Aboussoufian","Marwane Jnibi" ] },
      { tierLabel: "6th Place (6 points)", points: 6, participants: [
        "Taoufiq El Ouassifi","Salaheddine Bennissi","Amine Sekhri","Karima Saidi" ] }
    ],
    '2': [], '3': [], '4': [], '5': [], '6': [], 'final': []
  };

  const styles = { containerClass: "africa-cup-ranking", titleClass: "ranking-title", tierClass: "ranking-tier", nameListClass: "participant-list", nameItemClass: "participant-item", highlightItemClass: "participant-item--highlight", calloutClass: "ranking-callout" };
  const highlightNames = [ "El Mehdi Moualim" ];

  function createEl(tag, className, textContent){ const el=document.createElement(tag); if(className) el.className=className; if(textContent!==undefined) el.textContent=textContent; return el; }
  function normalize(s){ return String(s).trim().toLowerCase(); }
  function isHighlighted(name){ return highlightNames.map(normalize).includes(normalize(name)); }

  function renderRanking(mount, tiers){
    if(!mount){ console.warn('Missing #ranking'); return; }
    const container=createEl('section', styles.containerClass);
    const title=createEl('h2', styles.titleClass, 'Cup of Africa Pronostics – Ranking');
    container.appendChild(title);

    if(!tiers || tiers.length===0){
      const empty=createEl('p', styles.calloutClass, 'No data available for this phase yet.');
      container.appendChild(empty);
      mount.innerHTML='';
      mount.appendChild(container);
      return;
    }

    tiers.forEach(tier=>{
      const tierBlock=createEl('div', styles.tierClass);
      const tierHeader=createEl('h3', null, tier.tierLabel);
      tierBlock.appendChild(tierHeader);
      const list=createEl('ul', styles.nameListClass);
      tier.participants.forEach(name=>{
        const li=createEl('li', styles.nameItemClass, name);
        if(isHighlighted(name)) li.classList.add(styles.highlightItemClass);
        list.appendChild(li);
      });
      tierBlock.appendChild(list);
      container.appendChild(tierBlock);
    });

    const callout=createEl('p', styles.calloutClass, '\uD83D\uDD25 Great job everyone! Stay tuned for the next phase!');
    container.appendChild(callout);
    mount.innerHTML='';
    mount.appendChild(container);
  }

  function renderPhase(phase){
    const mount=document.getElementById('ranking');
    const key = String(phase).toLowerCase();
    renderRanking(mount, datasets[key]);
  }

  window.CupOfAfricaRanking = { renderPhase };
})();
