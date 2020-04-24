import { Injectable } from "@nestjs/common";
import { ReleaseEntity } from "./release.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ReleaseService {
    constructor(
        @InjectRepository(ReleaseEntity)
        private readonly releaseRepository: Repository<ReleaseEntity>
    ) {}

    async findAll(): Promise<ReleaseEntity[]> {
        return await this.releaseRepository.find({ relations: ['image'] });
    }

    async find(id: string): Promise<ReleaseEntity> {

        const release = await this.releaseRepository
            .createQueryBuilder('release')
            .innerJoinAndSelect('release.image', 'releaseImage')
            .innerJoinAndSelect('release.articles', 'articles')
            .leftJoinAndSelect('articles.image', 'image')
            .leftJoinAndSelect('articles.author', 'author')
            .leftJoinAndSelect('articles.tags', 'tags')
            .where('release.id=:id')
            .setParameter('id', id)
            .orderBy('articles.order', 'ASC')
            .getOne();

        return release;
    }

    async save(release: ReleaseEntity): Promise<ReleaseEntity> {
        return await this.releaseRepository.save(release);
    }

    async delete(id: string): Promise<ReleaseEntity> {
        const release = await this.releaseRepository.findOne(id);
        if (!release){
            return release;
        }
        return await this.releaseRepository.remove(release);

        //return await this.releaseRepository.delete({ id });
    }
}
