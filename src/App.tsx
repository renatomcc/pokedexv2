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
  var search: Pokemon[] = searchPoke.length > 0 ? filteredDex.filter(poke => poke.name.toLocaleLowerCase().includes(searchPoke.toLowerCase())).slice(0, pokesPerPage) : filteredDex.slice(0, pokesPerPage);
  const [scroll, scrollTo] = useWindowScroll();

  function handleSelect(selectOption: string | null) {
    setSelect(selectOption)
    setOption('')
    switch (selectOption) {
      case 'favorites':
        setData(noData)
        setFilteredDex(filteredDex.filter(poke => favorites.includes(poke.id)))
        break
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

  async function handleFilter(filterOption: string | null) {
    setPokesPerPage(35)
    setOption(filterOption)
    switch (select) {
      case 'id':
        if (filterOption == 'id') {
          setFilteredDex(pokemons.sort(function (a, b) {
            return a.id - b.id;
          }))
        }
        if (filterOption == 'name') {
          setFilteredDex([...pokemons].sort((a, b) =>
            a.name > b.name ? 1 : -1,
          ));
        }
        break;
      case 'type':
        if (filterOption == 'all') setFilteredDex(pokemons)
        else setFilteredDex(pokemons.filter(poke => poke.types[0].type.name == filterOption || (poke.types[1] != null && poke.types[1].type.name == filterOption)))
        console.log('filtrou por type', filterOption)
        break;
      case 'category':
        setFilteredDex(pokemons.filter(poke => poke.category == filterOption))
        break;
      case 'habitat':
        if (filterOption == 'all') setFilteredDex(pokemons)
        else setFilteredDex(pokemons.filter(poke => poke.habitat == filterOption))
        break;
      case 'shape':
        if (filterOption == 'all') setFilteredDex(pokemons)
        else setFilteredDex(pokemons.filter(poke => poke.shape == filterOption))
        break;
    }
  }

  async function fetchData() {
    Promise.all(
      await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=858')
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
        let pokemon: Pokemon = {
          id: item.id,
          name: item.name,
          img: item.sprites.other.home['front_default'],
          imgShiny: item.sprites.other.home['front_shiny'],
          types: item.types,
          habitat: '',
          category: '',
          shape: '',
        }
        axios.get(`${item.species.url}`).then(res => {
          if (res.data.habitat) pokemon.habitat = res.data.habitat.name[0].toUpperCase() + res.data.habitat.name.slice(1)
          if (res.data.shape) pokemon.shape = res.data.shape.name[0].toUpperCase() + res.data.shape.name.slice(1)
          if (res.data.is_baby) pokemon.category = 'Baby'
          if (res.data.is_mythical) pokemon.category = 'Mythical'
          if (res.data.is_legendary) pokemon.category = 'Legendary'
          if (!res.data.is_baby && !res.data.is_mythical && !res.data.is_legendary) pokemon.category = 'Normal'
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
      )}
      <StyledGrid>
        <StyledColumn xs={12} sm={8} md={8} lg={5} xl={5}>
          <StyledGrid>
            <StyledColumn style={{ flexDirection: 'column' }}>
              <StyledBadge color={darkTheme ? 'indigo' : 'dark'} radius='sm' variant={darkTheme ? 'light' : 'filled'} size='lg'>SORT BY</StyledBadge>
              <StyledSelect
                placeholder="Select a Filter"
                data={[
                  { value: 'favorites', label: 'Favorites' },
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
                placeholder='Select an Option'
                data={data}
                size='sm'
                disabled={data != noData ? false : true}
                onChange={(e) => { handleFilter(e) }}
                style={{ width: '80%' }}
                value={option}
              />
            </StyledColumn>
          </StyledGrid>
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
            {pokesPerPage <= filteredDex.length ?
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
  habitat: string,
  category: string,
  shape: string,
}

export default App