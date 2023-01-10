import 'reflect-metadata'

import { Container } from 'inversify'
import { TYPES } from './types'

import { ItemRepository } from './domain/repository'

import { ItemsHTTPController } from './api/http/controller'
import { HTTPRouter } from './api/http/router'
import { Server, IServer } from './api/http/server'

import { ItemService } from './app/item'

import { MemoryData } from './infra/database/memory/memory-data'
import { ItemMemoryRepository } from './infra/database/memory/repositories/item'

const container = new Container()

container.bind(TYPES.ItemsHTTPController).to(ItemsHTTPController).inSingletonScope()
container.bind(TYPES.HTTPRouter).to(HTTPRouter).inSingletonScope()
container.bind<IServer>(TYPES.Server).to(Server).inSingletonScope()

container.bind(TYPES.ItemService).to(ItemService)

container.bind(TYPES.Database).to(MemoryData).inSingletonScope()
container.bind<ItemRepository>(TYPES.ItemRepository).to(ItemMemoryRepository)

export { container }
