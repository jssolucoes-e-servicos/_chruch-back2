import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { ResponseResultsHelper } from 'src/common/helpers/response-results.helper';
import { IFindWithName } from 'src/common/interfaces';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { UserCreateDTO } from 'src/modules/users/dto/users.create.dto';
import { UserUpdateDTO } from 'src/modules/users/dto/users.update.dto';
@Injectable()
export class UsersService {
  private readonly _name: string = this.constructor.name;
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
  ) {}

  async create(churchId: string, data: UserCreateDTO) {
    const dataExists = await this._prisma.user.findFirst({
      where: {
        churchId: churchId,
        email: data.email,
      },
    });
    if (dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists('User');
    }

    const user = await this._prisma.user.create({
      data: {
        name: data.name,
        genre: data.genre,
        maritalStatus: data.maritalStatus,
        birth: data.birth,
        photo: data.photo,
        email: data.email,
        username: data.username,
        password: data.password ? await hash(data.password, 10) : null,
        loginAttempts: 5,
        loginStats: 'not_verified',
        inRecovery: false,
        churchId: data.churchId,
        member: false,
        dizimist: false,
        permitChurch: false,
        permitPortal: true,
      },
    });

    return {
      ...user,
      password: undefined,
    };
  }

  async findGlobal() {}

  async findAll(churchId: string) {
    return await this._prisma.user.findMany({
      where: {
        churchId,
      },
      select: {
        id: true,
        name: true,
        genre: true,
        birth: true,
        photo: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        church: true,
        documents: true,
        addresses: true,
        phones: true,
        modules: true,
        cellsNetworks: {
          select: {
            id: true,
            image: true,
            name: true,
            color: true,
          },
        },
        cells: {
          select: {
            id: true,
            name: true,
            color: true,
            image: true,
            leader: {
              select: {
                genre: true,
                name: true,
              },
            },
            network: {
              select: {
                name: true,
                color: true,
                image: true,
                supervisor: {
                  select: {
                    genre: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this._prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        genre: true,
        birth: true,
        photo: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        church: true,
        documents: true,
        addresses: true,
        phones: true,
        modules: true,
        cellsNetworks: {
          select: {
            id: true,
            image: true,
            name: true,
            color: true,
          },
        },
        cells: {
          select: {
            id: true,
            name: true,
            color: true,
            image: true,
            leader: {
              select: {
                genre: true,
                name: true,
              },
            },
            network: {
              select: {
                name: true,
                color: true,
                image: true,
                supervisor: {
                  select: {
                    genre: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findWithName(churchId: string, data: IFindWithName) {
    const users = await this._prisma.user.findMany({
      where: {
        churchId: churchId,
        name: {
          contains: data.name,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        genre: true,
        birth: true,
        photo: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        documents: true,
        modules: true,
        cellsNetworks: {
          select: {
            id: true,
            image: true,
            name: true,
            color: true,
          },
        },
        cells: {
          select: {
            id: true,
            name: true,
            color: true,
            image: true,
            leader: {
              select: {
                genre: true,
                name: true,
              },
            },
            network: {
              select: {
                name: true,
                color: true,
                image: true,
                supervisor: {
                  select: {
                    genre: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return users;
  }

  async findByEmail(email: string): Promise<any> {
    const person = await this._prisma.user.findFirst({ where: { email } });
    return person;
  }

  async verifyPasswordToUnlock(personId: string, userPassword: string) {
    const person = await this._prisma.user.findUnique({
      where: {
        id: personId,
      },
    });
    if (person) {
      const isPasswordValid = await compare(userPassword, person.password);
      if (isPasswordValid) {
        return true;
      } else {
        return false;
      }
    }
  }

  async findByUsernameToLogin(username: string) {
    const person = await this._prisma.user.findFirst({
      where: { username },
      select: {
        id: true,
        name: true,
        genre: true,
        birth: true,
        photo: true,
        email: true,
        password: true,
        loginAttempts: true,
        loginStats: true,
        inRecovery: true,
        twoFactorAuthentication: true,
        permitChurch: true,
        permitPortal: true,
        dizimist: true,
        member: true,
        singnedAt: true,
        documents: true,
        addresses: true,
        phones: true,
        church: {
          select: {
            id: true,
            name: true,
            fantasy: true,
            image: true,
          },
        },
        cells: true,
      },
    });
    return person;
  }

  async update(id: string, data: UserUpdateDTO) {
    const dataExists = await this._prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists('Person');
    }

    if (data.password) {
      data.password = await hash(data.password, 10);
    }

    await this._prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        genre: data.genre,
        maritalStatus: data.maritalStatus,
        birth: data.birth,
        photo: data.photo,
        email: data.email,
        username: data.username,
        member: false,
        dizimist: false,
        permitChurch: false,
        permitPortal: true,
      },
    });

    return 'ok';
  }

  async delete(id: string) {
    const personExists = await this._prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!personExists) {
      throw new Error('User does not exixts');
    }

    /*  return await this._prisma.user.delete({
      where: {
        id,
      },
    }); */
    return await this._prisma.user.update({
      data: {
        active: false,
      },
      where: {
        id,
      },
    });
  }
}
