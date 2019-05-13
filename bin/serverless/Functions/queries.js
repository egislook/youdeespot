module.exports = {
  
  getPlaylistData: `
    query { playlist { id title playlistId title description img channelTitle itemCount videoIds } }
  `,
  
  leadSubscription: (filters) => `
    subscription pagination($limit: Int, $offset: Int) {
      Lead(limit: $limit, offset: $offset){ id }
    }
  `,
  
  upsertMultiple: (table, { columns, key }) => `
    mutation($values: [${table}_insert_input!]!){ 
      insert_${table}( 
        objects: $values, 
        on_conflict: { 
          constraint: ${table}_${key}_key,
          update_columns: [${columns.join(', ')}]
        }
      ) { returning { id ${columns.join(' ')} } }
    }
  `,
  
  upsert: (table, { columns, key }) => `
    mutation($values: ${table}_insert_input!){ 
      insert_${table}( 
        objects: [$values], 
        on_conflict: { 
          constraint: ${table}_${key}_key,
          update_columns: [${columns.join(', ')}]
        }
      ) { returning { id ${columns.join(' ')} } }
    }
  `
}