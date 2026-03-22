import React from 'react';
const PLAYERS = [
  {
    id: 1,
    firstName: 'Kylian',
    lastName: 'Mbappé',
    number: '10',
    role: 'FW',
    image: 'https://i.pravatar.cc/500?img=12',
  },
  {
    id: 2,
    firstName: 'Antoine',
    lastName: 'Griezmann',
    number: '7',
    role: 'FW',
    image: 'https://i.pravatar.cc/500?img=60', 
  },
  {
    id: 3,
    firstName: 'Ousmane',
    lastName: 'Dembélé',
    number: '11',
    role: 'FW',
    image: 'https://i.pravatar.cc/500?img=13',
  },
  {
    id: 4,
    firstName: 'Olivier',
    lastName: 'Giroud',
    number: '9',
    role: 'FW',
    image: 'https://i.pravatar.cc/500?img=68',
  },
  {
    id: 5,
    firstName: 'Paul',
    lastName: 'Pogba',
    number: '6',
    role: 'CM',
    image: 'https://i.pravatar.cc/500?img=33',
  },
  {
    id: 6,
    firstName: 'N\'Golo',
    lastName: 'Kanté',
    number: '13',
    role: 'CDM',
    image: 'https://i.pravatar.cc/500?img=59', 
  }
];

const UserCards = () => {
  return (
    <div className="main-wrapper">
      <header className="top-header">
        <nav className="skewed-nav">
          <ul>
            <li className="active">TEAM</li>
            <li>RESULTS</li>
            <li>NEWS</li>
            <li>TABLES</li>
            <li>LEGENDS</li>
          </ul>
        </nav>
      </header>
      <h2 className="section-title">Strikers</h2>

      <div className="player-grid">
        {PLAYERS.map(player => (
          <div key={player.id} className="player-card">
            <div className="card-number-bg">{player.number}</div>
            
            <img 
              src={player.image} 
              alt={`${player.firstName} ${player.lastName}`} 
              className="player-image" 
            />
            
            <div className="card-info">
              <span className="first-name">{player.firstName}</span>
              <span className="last-name">{player.lastName}</span>
              <span className="player-role">{player.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCards;