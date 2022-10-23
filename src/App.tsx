import axios from 'axios'
import { useEffect, useState } from 'react'
import Pokecard from './components/Pokecard'
import { favorites } from './components/Pokecard';
import './styles/App.sass';
import { Container, Grid, Select, Checkbox, TextInput, Switch, Button, Badge, createPolymorphicComponent, BadgeProps, Loader, ButtonProps, ActionIcon, ActionIconProps } from '@mantine/core';
import styled from '@emotion/styled';
import { BsFillHeartFill, BsGithub } from 'react-icons/bs';
import { TbPokeball } from 'react-icons/tb'
import { Image } from '@mantine/core';
import { MdCatchingPokemon } from 'react-icons/md'
import { useWindowScroll } from '@mantine/hooks';
import { BiUpArrowAlt } from 'react-icons/bi'

const StyledGrid = styled(Grid)`
  display: flex;
  width: 90%;
  justify-content: center;
  align-content: center;
  align-items: center; 
`;
const StyledColumn = styled(Grid.Col)`
  display: flex;
  justify-content: center;
  align-items: center
`
const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #36486b;
  gap: 20px;
  padding: 20px;
`
const StyledSelect = styled(Select)`
  text-align: center;
  & .mantine-ittua2{
    color: white;
    font-size: 18px;
    font-weight: 600;
    text-shadow: rgba(0,0,0,0.6);
  }
`
const StyledInput = styled(TextInput)`
  text-align: center;
  & .mantine-1js7218{
    color: white;
    font-size: 18px;
    font-weight: 600;
    text-shadow: rgba(0,0,0,0.6);
  }
`
const StyledCheckbox = styled(Checkbox)`
  text-align: center;
  & .mantine-1prjls9{
    color: white;
    font-size: 18px;
    font-weight: 600;
    text-shadow: rgba(0,0,0,0.6);
  }
`
const _StyledBadge = styled(Badge)`
    margin: 10px 0px;
`
const StyledBadge = createPolymorphicComponent<'button', BadgeProps>(_StyledBadge);
const noData = [
  { value: 'none', label: 'none' },
]
const IDNameData = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Name' },
]
const TypeData = [
  { value: 'all', label: 'All' },
  { value: 'bug', label: 'Bug' },
  { value: 'dark', label: 'Dark' },
  { value: 'dragon', label: 'Dragon' },
  { value: 'electric', label: 'Electric' },
  { value: 'fairy', label: 'Fairy' },
  { value: 'fighting', label: 'Fighting' },
  { value: 'fire', label: 'Fire' },
  { value: 'flying', label: 'Flying' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'grass', label: 'Grass' },
  { value: 'ground', label: 'Ground' },
  { value: 'normal', label: 'Normal' },
  { value: 'poison', label: 'Poison' },
  { value: 'psychic', label: 'Psychic' },
  { value: 'rock', label: 'Rock' },
  { value: 'steel', label: 'Steel' },
  { value: 'water', label: 'Water' },
]
const CategoryData = [
  { value: 'Normal', label: 'Normal' },
  { value: 'Baby', label: 'Baby' },
  { value: 'Mythical', label: 'Mythical' },
  { value: 'Legendary', label: 'Legendary' },
]
const ShapeData = [
  { value: 'all', label: 'All' },
  { value: 'Armor', label: 'Armor' },
  { value: 'Arms', label: 'Arms' },
  { value: 'Ball', label: 'Ball' },
  { value: 'Blob', label: 'Blob' },
  { value: 'Bug-wings', label: 'Bug wings' },
  { value: 'Fish', label: 'Fish' },
  { value: 'Heads', label: 'Heads' },
  { value: 'Humanoid', label: 'Humanoid' },
  { value: 'Legs', label: 'Legs' },
  { value: 'Quadruped', label: 'Quadruped' },
  { value: 'Squiggle', label: 'Squiggle' },
  { value: 'Upright', label: 'Upright' },
  { value: 'Wings', label: 'Wings' },
]
const HabitatData = [
  { value: 'all', label: 'All' },
  { value: 'Cave', label: 'Cave' },
  { value: 'Forest', label: 'Forest' },
  { value: 'Grassland', label: 'Grassland' },
  { value: 'Mountain', label: 'Mountain' },
  { value: 'Rare', label: 'Rare' },
  { value: 'Rough-terrain', label: 'Rough terrain' },
  { value: 'Sea', label: 'Sea' },
  { value: 'Urban', label: 'Urban' },
  { value: 'Waters-edge', label: 'Waters edge' },
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  var pokedex: any = []
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [data, setData] = useState<typeof IDNameData>(noData);
  const [filteredDex, setFilteredDex] = useState(pokemons);
  const [select, setSelect] = useState<string | null>();
  const [option, setOption] = useState<string | null>(null);
  const [searchPoke, setSearchPoke] = useState('');
  const [darkTheme, setDarkTheme] = useState(false)
  const [pokesPerPage, setPokesPerPage] = useState(35);
  const slicedDex: Pokemon[] = filteredDex.slice(0, pokesPerPage);
  var search: Pokemon[] = searchPoke.length > 0 ? slicedDex.filter(poke => poke.name.toLocaleLowerCase().includes(searchPoke.toLowerCase())) : slicedDex;
  const [scroll, scrollTo] = useWindowScroll();


  function handleSelect(e: string | null) {
    setSelect(e)
    switch (e) {
      case 'id':
        setData(IDNameData);
        break;
      case 'type':
        setData(TypeData);
        break;
      case 'category':
        setData(CategoryData);
        break;
      case 'habitat':
        setData(HabitatData);
        break;
      case 'shape':
        setData(ShapeData);
        break;
    }
  }

  function handleFilter(e: string | null) {
    setOption(e)
    switch (select) {
      case 'id':
        if (e == 'id') {
          setFilteredDex(pokemons.sort(function (a, b) {
            return a.id - b.id;
          }))
        }
        if (e == 'name') {
          setFilteredDex([...pokemons].sort((a, b) =>
            a.name > b.name ? 1 : -1,
          ));
        }
        break;
      case 'type':
        if (e == 'all') setFilteredDex(pokemons)
        else setFilteredDex(pokemons.filter(poke => poke.types[0].type.name == e || (poke.types[1] != null && poke.types[1].type.name == e)))
        break;
      case 'category':
        setFilteredDex(pokemons.filter(poke => poke.category == e))
        break;
      case 'habitat':
        if (e == 'all') setFilteredDex(pokemons)
        else setFilteredDex(pokemons.filter(poke => poke.habitat == e))
        break;
      case 'shape':
        if (e == 'all') setFilteredDex(pokemons)
        else setFilteredDex(pokemons.filter(poke => poke.shape == e))
        break;
    }
  }

  function handleFavorite(e: boolean) {
    if (e) {
      if (option) {
        handleFilter(option);
        setFilteredDex(filteredDex.filter(poke => favorites.includes(poke.id)));
      }
      else {
        setFilteredDex(filteredDex.filter(poke => favorites.includes(poke.id)));
      }
    }
    else {
      select && option ? handleFilter(option) : setFilteredDex(pokemons)
    }

  }

  async function fetchData() {
    Promise.all(
      await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=800')
        .then((data: any) => {
          return data.data.results
        })
    ).then((response) => {
      //GET THE URL WITH THE INFORMATION OF EACH POKEMON AND SEND TO THE fetchPokemon FUNCTION
      fetchPokemon(response)
    })
  }

  async function fetchPokemon(data: any) {
    Promise.all(
      data.map(async (data: any) => {
        return await axios(data.url).then(response => {
          return response.data
        })
      })
    ).then(result => {
      result.map(async item => {
        //CREATE EACH POKEMON AND GET THE EASY TO OBTAIN INFOS FIRST (THE REST WILL NEED MORE FETCH TO GET)
        let pokemon: Pokemon = {
          id: item.id,
          name: item.name,
          img: item.sprites.other.home['front_default'],
          imgShiny: item.sprites.other.home['front_shiny'],
          types: item.types,
          alolaTypes: [],
          galarTypes: [],
          height: '',
          weight: '',
          abilities: [
            {
              name: '',
              description: '',
            },
            {
              name: null,
              description: null,
            },
            {
              name: null,
              description: null,
            }
          ],
          stats: [],
          megaStats: [],
          alolaStats: [],
          galarStats: [],
          gmaxStats: [],
          entry: '',
          title: '',
          habitat: '',
          gender_rate_male: '',
          gender_rate_female: '',
          genderless: false,
          category: '',
          evolutionChain: [
            {
              name: '',
              image: '',
            },
            {
              name: '',
              image: '',
            },
            {
              name: '',
              image: '',
            }],
          shape: '',
          mega: null,
          megaShiny: null,
          alola: null,
          alolaShiny: null,
          galar: null,
          galarShiny: null,
          gmax: null,
          gmaxShiny: null,
        }

        //GET THE POKEDEX ENTRY, THE TITLE, THE HABITAT, THE GENDER RATE, THE SHAPE, THE CATEGORY (BABY, MYTHICAL OR LEGENDARY) AND THE EVOLUTION CHAIN OF THE POKEMON
        fetch(`${item.species.url}`).then(res => { return res.json() }).then(data => {
          pokemon.entry = (data.flavor_text_entries.filter((entry: any) => entry.language.name == 'en')[0].flavor_text).replace(/\n|\f/gm, " ");
          pokemon.title = data.genera[7].genus.replace('\n', " ");

          if (data.habitat) pokemon.habitat = data.habitat.name[0].toUpperCase() + data.habitat.name.slice(1)

          let maleRate = ((Number(data.gender_rate + '00') / 8) - 100) * -1
          let femaleRate = Number(data.gender_rate + '00') / 8
          if (maleRate > 100 || maleRate < 0) pokemon.genderless = true;
          else {
            pokemon.gender_rate_male = maleRate + '%';
            pokemon.gender_rate_female = femaleRate + '%';
          }

          if (data.shape) pokemon.shape = data.shape.name[0].toUpperCase() + data.shape.name.slice(1)

          if (data.is_baby) pokemon.category = 'Baby'
          if (data.is_mythical) pokemon.category = 'Mythical'
          if (data.is_legendary) pokemon.category = 'Legendary'
          if (!data.is_baby && !data.is_mythical && !data.is_legendary) pokemon.category = 'Normal'


          fetch(`${data.evolution_chain.url}`).then(res => { return res.json() }).then(data => {
            pokemon.evolutionChain[0].name = data.chain.species.name[0].toUpperCase() + data.chain.species.name.slice(1)
            fetch(`${data.chain.species.url}`).then(res => { return res.json() }).then(data => {
              fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}`).then(res => { return res.json() }).then(data => {
                pokemon.evolutionChain[0].image = data.sprites.other.home.front_default
              })
            })

            if (data.chain.evolves_to[0]?.species.name != null) {
              pokemon.evolutionChain[1].name = data.chain.evolves_to[0].species.name[0].toUpperCase() + data.chain.species.name.slice(1)
              fetch(`${data.chain.evolves_to[0].species.url}`).then(res => { return res.json() }).then(data => {
                fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}`).then(res => { return res.json() }).then(data => {
                  pokemon.evolutionChain[1].image = data.sprites.other.home.front_default
                })
              })
            }

            if (data.chain.evolves_to[0]?.evolves_to[0]?.species.name != null) {
              pokemon.evolutionChain[2].name = data.chain.evolves_to[0].evolves_to[0].species.name[0].toUpperCase() + data.chain.species.name.slice(1)
              fetch(`${data.chain.evolves_to[0].evolves_to[0].species.url}`).then(res => { return res.json() }).then(data => {
                fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}`).then(res => { return res.json() }).then(data => {
                  pokemon.evolutionChain[2].image = data.sprites.other.home.front_default
                })
              })
            }
          })


          if (data.varieties[1]) {
            data.varieties.map((data: any) => {
              if (data.pokemon.name.includes('mega')) {
                fetch(`${data.pokemon.url}`).then(res => { return res.json() }).then(data => {
                  pokemon.mega = data.sprites.other.home.front_default
                  pokemon.megaShiny = data.sprites.other.home.front_shiny
                  pokemon.megaStats = data.stats
                })
              }
              if (data.pokemon.name.includes('alola')) {
                fetch(`${data.pokemon.url}`).then(res => { return res.json() }).then(data => {
                  pokemon.alola = data.sprites.other.home.front_default
                  pokemon.alolaShiny = data.sprites.other.home.front_shiny
                  pokemon.alolaStats = data.stats
                  pokemon.alolaTypes = data.types
                })
              }
              if (data.pokemon.name.includes('galar')) {
                fetch(`${data.pokemon.url}`).then(res => { return res.json() }).then(data => {
                  pokemon.galar = data.sprites.other.home.front_default
                  pokemon.galarShiny = data.sprites.other.home.front_shiny
                  pokemon.galarStats = data.stats
                  pokemon.galarTypes = data.types
                })
              }
              if (data.pokemon.name.includes('gmax')) {
                fetch(`${data.pokemon.url}`).then(res => { return res.json() }).then(data => {
                  pokemon.gmax = data.sprites.other.home.front_default
                  pokemon.gmaxShiny = data.sprites.other.home.front_shiny
                  pokemon.gmaxStats = data.stats
                })
              }
            })
          }
        })
        pokedex.push(pokemon)
      })
    }).then(res => {
      setPokemons(pokedex)
      setFilteredDex(pokedex)
      setIsLoading(false)
      return res
    })
  }

  const loadMore = () => {
    if (searchPoke.length > 0) setPokesPerPage(pokesPerPage + 50)
    else setPokesPerPage(pokesPerPage + 15)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <StyledContainer
      fluid
      style={{
        backgroundColor: `${darkTheme ? '#21314e' : '#799ce2'}`,
        transition: 'all 0.5s linear',
      }}
    >
      <StyledGrid>
        <StyledColumn xs={12} sm={1} md={1} lg={1} xl={1}>
          <Switch
            size="lg"
            color={darkTheme ? 'red' : 'white'}
            onLabel={<MdCatchingPokemon size={20} color='white' />}
            offLabel={<TbPokeball size={20} color='black' />}
            onChange={() => { setDarkTheme(!darkTheme) }}
          />
        </StyledColumn>
        <StyledColumn xs={12} sm={8} md={8} lg={8} xl={8}>
          <Image
            radius="md"
            src="https://user-images.githubusercontent.com/29473781/180619084-a56960ab-7efa-4e34-9d33-4e3e581d62ff.png"
            alt="Pokedex Logo"
            width={300}
            height={100}
            fit="contain"
          />
        </StyledColumn>
        <StyledColumn xs={12} sm={1} md={1} lg={1} xl={1}>
          <Button
            component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/renatomcc/"
            leftIcon={<BsGithub size={18} />}
            styles={{
              root: {
                backgroundColor: `${darkTheme ? '#fa5252' : '#000000'}`,
                border: 0,
                height: 40,
                padding: 10,
                borderRadius: 10,
                '&:hover': {
                  backgroundColor: `${darkTheme ? '#c33030' : '#2a2a2a'}`,
                },
              },

              leftIcon: {
                marginRight: 15,
              },
            }}
          >
            Github
          </Button>
        </StyledColumn>
      </StyledGrid>
      {scrollY > 1200 && (
        <>
          <ActionIcon color="pink" size="lg" radius="xl" variant="filled" style={{
            position: 'fixed',
            zIndex: '9',
            right: '20px',
            bottom: '20px',
          }}
            onClick={() => { scrollTo({ y: 0 }) }}
          >
            <BiUpArrowAlt size={26} />
          </ActionIcon>
        </>
      )
      }
      <StyledGrid>
        <StyledColumn xs={12} sm={8} md={8} lg={5} xl={5}>
          <StyledGrid>
            <StyledColumn style={{ flexDirection: 'column' }}>
              <StyledBadge color={darkTheme ? 'indigo' : 'dark'} radius='sm' variant={darkTheme ? 'light' : 'filled'} size='lg'>SORT BY</StyledBadge>
              <StyledSelect
                placeholder="Select Filter"
                data={[
                  { value: 'id', label: 'ID/Name' },
                  { value: 'type', label: 'Type' },
                  { value: 'category', label: 'Category' },
                  { value: 'habitat', label: 'Habitat' },
                  { value: 'shape', label: 'Shape' },
                ]}
                size='sm'
                onChange={(e) => { handleSelect(e) }}
                style={{
                  width: '80%',
                  backgroundColor: `${darkTheme ? 'none' : '#21314e'}`
                }}

              />
            </StyledColumn>
            <StyledColumn>
              <StyledSelect
                placeholder="Select Option"
                data={data}
                size='sm'
                disabled={data != noData ? false : true}
                onChange={(e) => { handleFilter(e) }}
                style={{ width: '80%' }}
              />
            </StyledColumn>
          </StyledGrid>
        </StyledColumn>
        <StyledColumn xs={12} sm={4} md={4} lg={2} xl={2}>
          <StyledCheckbox icon={BsFillHeartFill}
            onChange={e => { handleFavorite(e.target.checked) }}
            size='lg'
            radius={0}
          />
          <StyledBadge color={darkTheme ? 'indigo' : 'dark'} radius={0} variant={darkTheme ? 'light' : 'filled'} size='lg' style={{ padding: '14px 10px' }}>FAVORITES</StyledBadge>
        </StyledColumn>
        <StyledColumn xs={12} sm={6} md={6} lg={5} xl={5} style={{ flexDirection: 'column' }}>
          <StyledBadge color={darkTheme ? 'indigo' : 'dark'} radius='sm' variant={darkTheme ? 'light' : 'filled'} size='lg'>SEARCH POKEMON</StyledBadge>
          <StyledInput
            placeholder='Pokemon Name...'
            size='md'
            style={{ width: '70%' }}
            onChange={(e) => { setSearchPoke(e.target.value) }}
          />
        </StyledColumn>
      </StyledGrid>
      {
        isLoading && (
          <>
            <Loader color="pink" size="lg" />
            <Badge color="pink" size="xl" radius="xs" variant="filled">Catching 'Em All!</Badge>
          </>
        )
      }
      {
        !isLoading && (
          <>
            <StyledGrid>
              {
                <>
                  {search.map(poke => (
                    < Grid.Col style={{ maxWidth: 200 }} key={poke.id} >
                      <Pokecard props={poke} key={poke.id} />
                    </Grid.Col >
                  ))}
                </>
              }
            </StyledGrid >
            {slicedDex.length != filteredDex.length ?
              <Button color="pink" radius="md" size="md" leftIcon={<MdCatchingPokemon size={24} />} onClick={() => loadMore()} >
                Catch more!
              </Button>
              : null}
          </>
        )
      }
    </StyledContainer >
  )
}

export interface Pokemon {
  id: number,
  name: string,
  img: string,
  imgShiny: string,
  types: any[],
  alolaTypes: any[],
  galarTypes: any[],
  height: string,
  weight: string,
  abilities: any[],
  stats: any[],
  megaStats: any[],
  alolaStats: any[],
  galarStats: any[],
  gmaxStats: any[],
  entry: string,
  title: string,
  habitat: string,
  gender_rate_male: string,
  gender_rate_female: string,
  genderless: boolean,
  category: string,
  evolutionChain: any[],
  shape: string,
  mega: string | null,
  megaShiny: string | null,
  alola: string | null,
  alolaShiny: string | null,
  galar: string | null,
  galarShiny: string | null,
  gmax: string | null,
  gmaxShiny: string | null,
}

export default App
